import { Environment, getConfig, InitOptions, Core as KitCore, UserConfig } from '@oapiex/sdk-kit'

import { ApiBinder } from './ApiBinder'

export class Core extends KitCore {
    static override apiClass = ApiBinder

    declare api: ApiBinder


    /**
     * Creates an instance of Core.
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
        const conf = getConfig()
        config = {
            ...conf,
            ...config,
            urls: {
                live: 'https://api.maplerad.com',
                sandbox: 'https://api.maplerad.com',
                ...config?.urls,
                ...config?.urls,
            },
            auth: {
                type: 'bearer',
                token: (typeof clientId === 'object' ? ((clientId as InitOptions).auth as any)?.token : clientSecret) ?? conf.clientSecret ?? (conf.auth as any)?.token ?? process.env.MAPLERAD_CLIENT_SECRET!,
                ...(typeof clientId === 'object' ? (clientId as InitOptions).auth : {}),
            } as never,
        }

        super(clientId as any, clientSecret, encryptionKey, env, config)
    }
}