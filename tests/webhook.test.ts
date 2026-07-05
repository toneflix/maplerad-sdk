import { MapleradWebhookError, MapleradWebhooks } from '../src/Webhooks'
import { describe, expect, it } from 'vitest'

// A base64 signing secret; the `whsec_` prefix is stripped and the rest base64-decoded.
const SECRET = 'whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw'
const ID = 'msg_2abc'
const BODY = JSON.stringify({ event: 'issuing.created', reference: 'card_1', data: { id: 'card_1' } })

const at = (offsetSeconds = 0) => String(Math.floor(Date.now() / 1000) + offsetSeconds)

const headers = (webhooks: MapleradWebhooks, timestamp: string, body = BODY) => ({
  'svix-id': ID,
  'svix-timestamp': timestamp,
  'svix-signature': webhooks.sign(ID, timestamp, body),
})

describe('MapleradWebhooks', () => {
  const webhooks = new MapleradWebhooks(SECRET)

  it('verifies a correctly signed delivery and returns the parsed event', () => {
    const timestamp = at()
    const event = webhooks.verify(BODY, headers(webhooks, timestamp))

    expect(event.event).toBe('issuing.created')
    expect(event.reference).toBe('card_1')
    expect(event.data).toEqual({ id: 'card_1' })
  })

  it('accepts a v1-prefixed, space-delimited signature list', () => {
    const timestamp = at()
    const good = webhooks.sign(ID, timestamp, BODY)
    const event = webhooks.verify(BODY, {
      'svix-id': ID,
      'svix-timestamp': timestamp,
      'svix-signature': `v1,bogussignature ${good}`,
    })

    expect(event.event).toBe('issuing.created')
  })

  it('rejects a tampered body', () => {
    const timestamp = at()
    const signed = headers(webhooks, timestamp)

    expect(() => webhooks.verify(`${BODY} `, signed)).toThrow(MapleradWebhookError)
  })

  it('rejects a signature from a different secret', () => {
    const timestamp = at()
    const attacker = new MapleradWebhooks('whsec_AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH')

    expect(() =>
      webhooks.verify(BODY, {
        'svix-id': ID,
        'svix-timestamp': timestamp,
        'svix-signature': attacker.sign(ID, timestamp, BODY),
      }),
    ).toThrow(/Invalid Maplerad webhook signature/)
  })

  it('rejects a stale timestamp', () => {
    const timestamp = at(-600)

    expect(() => webhooks.verify(BODY, headers(webhooks, timestamp))).toThrow(
      /tolerance window/,
    )
  })

  it('rejects missing headers', () => {
    expect(() => webhooks.verify(BODY, { 'svix-id': ID })).toThrow(/Missing Svix signature headers/)
  })

  it('requires a secret', () => {
    expect(() => new MapleradWebhooks('')).toThrow(MapleradWebhookError)
  })
})
