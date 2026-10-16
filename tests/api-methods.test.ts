import * as sdk from '../src/index'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import fs from 'node:fs/promises'

const { sendMock, createSdkMock, generatedCustomerCreateMock, generatedCustomerListMock, getConfigMock, updateConfigMock } = vi.hoisted(
    () => ({
        sendMock: vi.fn(),
        generatedCustomerCreateMock: vi.fn(),
        generatedCustomerListMock: vi.fn(),
        createSdkMock: vi.fn((bundle, options) => ({
            api: {
                customers: {
                    create: generatedCustomerCreateMock,
                    list: generatedCustomerListMock,
                },
            },
            bundle,
            options,
        })),
        getConfigMock: vi.fn(() => ({})),
        updateConfigMock: vi.fn(),
    }),
)

vi.mock('@oapiex/sdk-kit', async () => {
    const actual = await vi.importActual<typeof import('@oapiex/sdk-kit')>(
        '@oapiex/sdk-kit',
    )

    return {
        ...actual,
        Http: {
            ...actual.Http,
            send: sendMock,
        },
        createSdk: createSdkMock,
        getConfig: getConfigMock,
        updateConfig: updateConfigMock,
    }
})


const apiModules = import.meta.glob('../src/Apis/*.ts')

type MethodSpec = {
    fileName: string
    className: string
    methodName: string
    paramNames: string[]
    urlPath: string
    urlParamsExpr: string
    urlQueryExpr: string
    httpMethod: string
    bodyExpr: string
}

const apiDir = new URL('../src/Apis/', import.meta.url)

const methodPattern =
    /async\s+(\w+)\s*\(([^)]*)\)\s*:\s*Promise<[\s\S]*?>\s*\{[\s\S]*?buildTargetUrl\('([^']+)',\s*([^,]+),\s*([^)]+)\)[\s\S]*?'([A-Z]+)'\s*,\s*([^,]+),\s*\{\s*\}\s*\)/g

async function collectMethodSpecs (): Promise<MethodSpec[]> {
    const files = (await fs.readdir(apiDir)).filter((file) => file.endsWith('.ts'))
    const specs: MethodSpec[] = []

    for (const fileName of files.sort()) {
        const fileUrl = new URL(fileName, apiDir)
        const source = await fs.readFile(fileUrl, 'utf8')
        const classMatch = source.match(/export class (\w+) extends BaseApi/)

        if (!classMatch) {
            continue
        }

        const className = classMatch[1]

        for (const match of source.matchAll(methodPattern)) {
            const [, methodName, rawParams, urlPath, urlParamsExpr, urlQueryExpr, httpMethod, bodyExpr] = match
            const paramNames = rawParams.trim()
                ? rawParams
                    .split(',')
                    .map((segment) => segment.trim())
                    .filter(Boolean)
                    .map((segment) =>
                        segment
                            .split(':')[0]
                            .replace(/\?/g, '')
                            .replace(/=.*/, '')
                            .trim(),
                    )
                : []

            specs.push({
                fileName,
                className,
                methodName,
                paramNames,
                urlPath,
                urlParamsExpr,
                urlQueryExpr,
                httpMethod,
                bodyExpr,
            })
        }
    }

    return specs
}

function normalizeExpression (expression: string): string {
    return expression.replace(/\s+/g, '').trim()
}

function resolveExpression (
    expression: string,
    argsByName: Record<string, unknown>,
): unknown {
    const normalized = normalizeExpression(expression)

    if (normalized === '{}') {
        return {}
    }

    const coalescedMatch = normalized.match(/^(\w+)\?\?\{\}$/)

    if (coalescedMatch) {
        return argsByName[coalescedMatch[1]] ?? {}
    }

    return argsByName[normalized]
}

const methodSpecs = await collectMethodSpecs()

describe('generated API methods', () => {
    beforeEach(() => {
        sendMock.mockReset()
    })

    it('covers the full generated method surface', () => {
        expect(methodSpecs).toHaveLength(72)
    })

    for (const spec of methodSpecs) {
        it(`${spec.className}.${spec.methodName} validates, builds URLs, and sends requests`, async () => {
            const validateAccess = vi.fn().mockResolvedValue(undefined)
            const buildTargetUrl = vi.fn().mockReturnValue('built-url')
            const core = {
                validateAccess,
                http: { send: sendMock },
                builder: {
                    buildTargetUrl,
                },
            } as any

            const args = spec.className === 'Customer' && spec.methodName === 'create'
                ? [{
                    country: 'NG',
                    email: 'customer@example.test',
                    first_name: 'Test',
                    last_name: 'Customer',
                }]
                : spec.className === 'EnrollCustomer' && spec.methodName === 'create'
                    ? [{
                        country: 'NG',
                        dob: '1990-01-01',
                        email: 'customer@example.test',
                        first_name: 'Test',
                        identification_number: '12345678901',
                        last_name: 'Customer',
                    }]
                    : spec.paramNames.map((name) => ({ [`__${name}`]: name }))
            const argsByName = Object.fromEntries(
                spec.paramNames.map((name, index) => [name, args[index]]),
            )
            const expectedResponse = {
                className: spec.className,
                methodName: spec.methodName,
            }

            if (spec.className === 'Customer' && spec.methodName === 'create') {
                sendMock
                    .mockResolvedValueOnce({ data: [] })
                    .mockResolvedValueOnce({ data: expectedResponse })
            } else if (spec.className === 'EnrollCustomer' && spec.methodName === 'create') {
                sendMock
                    .mockResolvedValueOnce({ data: [] })
                    .mockResolvedValueOnce({ data: expectedResponse })
            } else {
                sendMock.mockResolvedValueOnce({ data: expectedResponse })
            }

            const loadModule = apiModules[`../src/Apis/${spec.fileName}`]

            if (!loadModule) {
                throw new Error(`Missing module loader for ${spec.fileName}`)
            }

            const module = await loadModule() as Record<string, unknown>
            const ApiClass = module[spec.className] as new (core: unknown) => {
                [key: string]: (...input: unknown[]) => Promise<unknown>
            }
            const instance = new ApiClass(core)
            const result = await instance[spec.methodName](...args)

            if (
                (spec.className === 'Customer' || spec.className === 'EnrollCustomer')
                && spec.methodName === 'create'
            ) {
                expect(validateAccess).toHaveBeenCalledTimes(2)
                expect(sendMock).toHaveBeenCalledTimes(2)
            } else {
                expect(validateAccess).toHaveBeenCalledTimes(1)
                expect(buildTargetUrl).toHaveBeenCalledWith(
                    spec.urlPath,
                    resolveExpression(spec.urlParamsExpr, argsByName),
                    resolveExpression(spec.urlQueryExpr, argsByName),
                )
                expect(sendMock).toHaveBeenCalledWith(
                    'built-url',
                    spec.httpMethod,
                    resolveExpression(spec.bodyExpr, argsByName),
                    {},
                )
            }
            expect(result).toEqual(expectedResponse)
        })
    }
})

describe('runtime helpers', () => {
    beforeEach(() => {
        createSdkMock.mockClear()
        generatedCustomerCreateMock.mockReset()
        generatedCustomerListMock.mockReset()
        getConfigMock.mockReset()
        getConfigMock.mockReturnValue({
            clientSecret: 'config-secret',
            urls: {
                live: 'https://live-config.example.com',
            },
            auth: {
                prefix: 'Bearer',
            },
        })
    })

    it('leaves the shared kit config alone on module load', () => {
        // Writing defaults there used to leak Maplerad's URLs into other SDKs' clients.
        expect(updateConfigMock).not.toHaveBeenCalled()
    })

    it('createClient builds a Maplerad client from its own options', () => {
        const client = sdk.createClient({
            environment: 'sandbox',
            clientSecret: 'option-secret',
            headers: {
                'x-request-id': 'trace-id',
            },
            urls: {
                sandbox: 'https://sandbox.example.com',
            },
            auth: {
                type: 'bearer',
                token: 'option-token',
            },
        })

        expect(client).toBeInstanceOf(sdk.Core)
        expect(createSdkMock).not.toHaveBeenCalled()
        expect(client.getConfig()).toMatchObject({
            environment: 'sandbox',
            headers: { 'x-request-id': 'trace-id' },
            urls: {
                live: 'https://api.maplerad.com',
                sandbox: 'https://sandbox.example.com',
            },
            auth: { type: 'bearer', token: 'option-token' },
        })
        expect(client.builder.baseUrl()).toBe('https://sandbox.example.com/')
    })

    it('createClient falls back to the client secret for bearer auth', () => {
        const client = sdk.createClient({ clientSecret: 'option-secret' })

        expect(client.getConfig().auth).toEqual({ type: 'bearer', token: 'option-secret' })
    })

    it('createClient deduplicates customer creation by email', async () => {
        const existingCustomer = {
            id: 'customer_existing',
            email: 'customer@example.test',
        }
        const client = sdk.createClient({ clientSecret: 'option-secret' })
        const send = vi.spyOn(client.http, 'send').mockResolvedValue({
            success: true,
            message: 'ok',
            data: [existingCustomer],
        })

        await expect(client.api.customers.create({
            country: 'NG',
            email: 'customer@example.test',
            first_name: 'Existing',
            last_name: 'Customer',
        })).resolves.toEqual(existingCustomer)
        expect(send).toHaveBeenCalledTimes(1)
        expect(send.mock.calls[0][0]).toContain('email=customer%40example.test')
        expect(send.mock.calls[0][1]).toBe('GET')
    })
})
