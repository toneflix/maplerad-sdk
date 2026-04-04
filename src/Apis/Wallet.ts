import { BaseApi } from '../BaseApi'
import type { WalletList } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Wallet extends BaseApi {

    /**
     * Get Wallets
     *
     * This resource returns details about your business account.
     *
     * HTTP GET /v1/wallets
     * Operation ID: getV1Wallets
     * @returns 200 WalletList[]
     */
    async list (): Promise<WalletList[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<WalletList[]>(
            this.core.builder.buildTargetUrl('/v1/wallets', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}