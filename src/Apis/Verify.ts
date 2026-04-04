import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Verify as VerifyModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Verify extends BaseApi {

    /**
     * Verify Transaction
     *
     * This resource verifies a collection transaction by its ID.
     *
     * HTTP GET /v1/transactions/verify/{id}
     * Operation ID: getV1TransactionsVerifyId
     *
     * @param params id: transaction ID Type: CustomerByIdParams
     * @returns 200 VerifyModel
     */
    async get (params: CustomerByIdParams): Promise<VerifyModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<VerifyModel>(
            this.core.builder.buildTargetUrl('/v1/transactions/verify/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}