import { Environment, getBaseConfig, InitOptions, Core as KitCore, UserConfig } from '@oapiex/sdk-kit'

import { ApiBinder } from './ApiBinder'

export const MAPLERAD_URLS = {
    live: 'https://api.maplerad.com',
    sandbox: 'https://api.maplerad.com',
} as const

/**
 * The URLs a config file set, without the kit's empty placeholders.
 *
 * @param urls
 */
const configuredUrls = (urls?: UserConfig['urls']) =>
    Object.fromEntries(Object.entries(urls ?? {}).filter(([, url]) => Boolean(url)))

export class Core extends KitCore {
    static override apiClass = ApiBinder

    /** Read `maplerad.config.*`, whatever other SDKs in the process read. */
    static override configFile = 'maplerad.config'

    declare api: ApiBinder

    /**
     * Creates an instance of Core.
     *
     * Settings come from the arguments, then `maplerad.config.*`, then
     * `MAPLERAD_CLIENT_SECRET`; never from another client in the process.
     *
     * @param clientId
     * @param clientSecret
     * @param encryptionKey
     */
    constructor(clientId?: InitOptions)
    constructor(clientId?: string, clientSecret?: string, encryptionKey?: string, env?: Environment, config?: Partial<UserConfig>)
    constructor(
        clientId?: string | InitOptions,
        clientSecret?: string,
        encryptionKey?: string,
        env?: Environment,
        config?: Partial<UserConfig>
    ) {
        const options: InitOptions = typeof clientId === 'object' && clientId !== null
            ? { ...clientId }
            : {
                ...config,
                clientId,
                clientSecret,
                encryptionKey,
                environment: env ?? config?.environment,
            }
        const base = getBaseConfig(Core.configFile)
        const token = (options.auth as any)?.token
            ?? options.clientSecret
            ?? base.clientSecret
            ?? (base.auth as any)?.token
            ?? process.env.MAPLERAD_CLIENT_SECRET

        super({
            ...options,
            urls: {
                ...MAPLERAD_URLS,
                ...configuredUrls(base.urls),
                ...options.urls,
            },
            auth: options.auth ?? (token ? ({ type: 'bearer', token } as never) : undefined),
        })
    }
}
