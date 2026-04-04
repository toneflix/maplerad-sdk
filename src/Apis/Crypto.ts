import { BaseApi } from '../BaseApi'
import type { Active, Crypto as CryptoModel, CryptoByAddressIdParams, CryptoByIdInput, CryptoInput, CustomerByIdParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Crypto extends BaseApi {

    /**
     * Generate Address
     *
     * Creates a unique stablecoin deposit address for your customer.
     *
     * HTTP POST /v1/crypto
     * Operation ID: postV1Crypto
     *
     * @param body Request body Type: CryptoInput
     * @returns 200 CryptoModel
     */
    async create (body: CryptoInput): Promise<CryptoModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<CryptoModel>(
            this.core.builder.buildTargetUrl('/v1/crypto', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Get Address
     *
     * HTTP GET /v1/crypto/{address_id}
     * Operation ID: getV1CryptoAddressId
     *
     * @param params address_id Type: CryptoByAddressIdParams
     * @returns 200 CryptoModel
     */
    async get (params: CryptoByAddressIdParams): Promise<CryptoModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<CryptoModel>(
            this.core.builder.buildTargetUrl('/v1/crypto/{address_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }

    /**
     * HTTP PATCH /v1/crypto/:id
     * Operation ID: patchV1CryptoId
     *
     * @param params id Type: CustomerByIdParams
     * @param body Request body Type: CryptoByIdInput
     * @returns 200 Active
     */
    async update (params: CustomerByIdParams, body: CryptoByIdInput): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/crypto/:id', params, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}