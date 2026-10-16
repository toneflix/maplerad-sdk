import { BaseApi } from '../BaseApi'
import type { ActiveParams, Crypto } from '../Schema'

export class CryptoWallet extends BaseApi {

    /**
     * HTTP GET /v1/crypto/wallets/{customer_id}
     * Operation ID: getV1CryptoWalletsCustomerId
     *
     * @param params customer_id Type: ActiveParams
     * @returns 200 Crypto[]
     */
    async get (params: ActiveParams): Promise<Crypto[]> {
        await this.core.validateAccess()

        const { data } = await this.core.http.send<Crypto[]>(
            this.core.builder.buildTargetUrl('/v1/crypto/wallets/{customer_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}