import * as sdk from '../src/index'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import fs from 'node:fs/promises'

const { sendMock, createSdkMock, getConfigMock, updateConfigMock } = vi.hoisted(
    () => ({
        sendMock: vi.fn(),
        createSdkMock: vi.fn((bundle, options) => ({ api: {}, bundle, options })),
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
                builder: {
                    buildTargetUrl,
                },
            } as any

            const args = spec.paramNames.map((name) => ({ [`__${name}`]: name }))
            const argsByName = Object.fromEntries(
                spec.paramNames.map((name, index) => [name, args[index]]),
            )
            const expectedResponse = {
                className: spec.className,
                methodName: spec.methodName,
            }

            sendMock.mockResolvedValueOnce({ data: expectedResponse })

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
            expect(result).toEqual(expectedResponse)
        })
    }
})

describe('runtime helpers', () => {
    beforeEach(() => {
        createSdkMock.mockClear()
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

    it('updates shared runtime defaults on module load', () => {
        expect(updateConfigMock).toHaveBeenCalledWith({
            urls: {
                live: 'https://api.maplerad.com',
                sandbox: 'https://api.maplerad.com',
            },
        })
    })

    it('createClient merges config defaults and explicit options before binding the runtime sdk', () => {
        sdk.createClient({
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

        expect(createSdkMock).toHaveBeenCalledTimes(1)
        expect(createSdkMock).toHaveBeenCalledWith(
            sdk.extractedApiDocumentSdk,
            expect.objectContaining({
                environment: 'sandbox',
                clientSecret: 'option-secret',
                headers: {
                    'x-request-id': 'trace-id',
                },
                urls: {
                    live: 'https://live-config.example.com',
                    sandbox: 'https://sandbox.example.com',
                },
                auth: {
                    type: 'bearer',
                    token: 'option-token',
                    prefix: 'Bearer',
                },
            }),
        )
    })
})