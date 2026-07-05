import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Maplerad signs webhooks with Svix. Every delivery carries three headers,
 * `svix-id`, `svix-timestamp`, and `svix-signature`, and the signature is an
 * HMAC-SHA256 of `${id}.${timestamp}.${rawBody}` keyed by the base64 portion of
 * the `whsec_` signing secret. This module does that verification (constant-time,
 * with a timestamp tolerance to blunt replays) and parses the delivery into a
 * typed event, so consumers never have to hand-roll the crypto.
 *
 * @see https://maplerad.dev/docs/verifying-webhooks
 */

/** Request headers as delivered (Express-style: value may be an array). */
export type MapleradWebhookHeaders = Record<string, string | string[] | undefined>

/** A parsed Maplerad webhook delivery. */
export interface MapleradWebhookEvent<TData = Record<string, unknown>> {
  /** The event name, e.g. `issuing.created`, `transfer.successful`. */
  event: string
  /** Some payloads carry a `type` alongside/instead of `event`. */
  type?: string
  /** A provider reference for the affected resource, when present. */
  reference?: string
  /** The event body. */
  data: TData
  [key: string]: unknown
}

export interface WebhookVerifyOptions {
  /** Allowed clock skew between the signed timestamp and now, in seconds. */
  toleranceSeconds?: number
  /** Injectable clock (ms since epoch) for testing. */
  now?: number
}

/** 
 * Thrown when a webhook cannot be verified or parsed. 
 */
export class MapleradWebhookError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MapleradWebhookError'
  }
}

const DEFAULT_TOLERANCE_SECONDS = 300
const SIGNATURE_VERSION = 'v1'

export class MapleradWebhooks {
  private readonly key: Buffer

  /**
   * @param secret The Svix signing secret from the Maplerad dashboard. The
   *   `whsec_` prefix is optional; the HMAC key is the base64 portion after it.
   * 
   * @param secret 
   */
  constructor(secret: string) {
    if (!secret) {
      throw new MapleradWebhookError('A Maplerad webhook signing secret is required')
    }
    const base64 = secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret
    this.key = Buffer.from(base64, 'base64')
  }

  /**
   * Verify a delivery's Svix signature and return the parsed event. Throws a
   * {@link MapleradWebhookError} when the headers are missing, the timestamp is
   * stale, or no signature matches.
   * 
   * @param rawBody 
   * @param headers 
   * @param options 
   * @returns 
   */
  verify<TData = Record<string, unknown>>(
    rawBody: string | Buffer,
    headers: MapleradWebhookHeaders,
    options: WebhookVerifyOptions = {},
  ): MapleradWebhookEvent<TData> {
    const body = this.toBody(rawBody)
    const id = this.header(headers, 'svix-id')
    const timestamp = this.header(headers, 'svix-timestamp')
    const signatureHeader = this.header(headers, 'svix-signature')

    if (!id || !timestamp || !signatureHeader) {
      throw new MapleradWebhookError('Missing Svix signature headers')
    }

    this.assertFreshTimestamp(timestamp, options)

    const expected = Buffer.from(this.digest(id, timestamp, body))

    // The header is a space-delimited list of `v1,<base64>` signatures; any match wins.
    const matched = signatureHeader.split(' ').some((entry) => {
      const [, signature] = entry.split(',')
      if (!signature) return false
      const candidate = Buffer.from(signature)

      return candidate.length === expected.length && timingSafeEqual(candidate, expected)
    })

    if (!matched) {
      throw new MapleradWebhookError('Invalid Maplerad webhook signature')
    }

    return this.parse<TData>(body)
  }

  /** 
   * Parse a raw body into a typed event without verifying the signature.
   * 
   * @param rawBody 
   * @returns 
   */
  parse<TData = Record<string, unknown>>(rawBody: string | Buffer): MapleradWebhookEvent<TData> {
    const body = this.toBody(rawBody)
    let json: Record<string, unknown>
    try {
      json = JSON.parse(body) as Record<string, unknown>
    } catch {
      throw new MapleradWebhookError('Webhook body is not valid JSON')
    }

    const data = (json.data ?? {}) as Record<string, unknown>

    return {
      ...json,
      event: String(json.event ?? json.type ?? ''),
      type: json.type != null ? String(json.type) : undefined,
      reference:
        (json.reference as string | undefined) ?? (data.reference as string | undefined),
      data: data as TData,
    }
  }

  /**
   * Produce a `v1,<base64>` signature for a body. Primarily for tests and for
   * services that need to replay or self-sign a delivery.
   * 
   * @param id 
   * @param timestamp 
   * @param rawBody 
   * @returns 
   */
  sign(id: string, timestamp: string | number, rawBody: string | Buffer): string {
    return `${SIGNATURE_VERSION},${this.digest(id, String(timestamp), this.toBody(rawBody))}`
  }

  private digest(id: string, timestamp: string, body: string): string {
    return createHmac('sha256', this.key).update(`${id}.${timestamp}.${body}`).digest('base64')
  }

  private assertFreshTimestamp(timestamp: string, options: WebhookVerifyOptions): void {
    const seconds = Number(timestamp)
    if (!Number.isFinite(seconds)) {
      throw new MapleradWebhookError('Invalid Svix timestamp header')
    }
    const tolerance = options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS
    const now = Math.floor((options.now ?? Date.now()) / 1000)
    if (Math.abs(now - seconds) > tolerance) {
      throw new MapleradWebhookError('Webhook timestamp is outside the tolerance window')
    }
  }

  private header(headers: MapleradWebhookHeaders, name: string): string {
    const target = name.toLowerCase()
    for (const key of Object.keys(headers)) {
      if (key.toLowerCase() === target) {
        const value = headers[key]

        return Array.isArray(value) ? (value[0] ?? '') : (value ?? '')
      }
    }

    return ''
  }

  private toBody(rawBody: string | Buffer): string {
    return typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8')
  }
}
