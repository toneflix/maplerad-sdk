import { BaseApi } from '../BaseApi'
import type { Usd as UsdModel, UsdInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Usd extends BaseApi {

    /**
     * Create Account (USD)
     *
     * This enables the creation of a USD virtual account for a customer. This returns a reference which will tell the status of your account request.
     *
     * HTTP POST /v1/collections/virtual-account/usd
     * Operation ID: postV1CollectionsVirtualAccountUsd
     *
     * @param body Request body Type: UsdInput
     * @returns 200 UsdModel
     */
    async create (body: UsdInput): Promise<UsdModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<UsdModel>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/usd', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}