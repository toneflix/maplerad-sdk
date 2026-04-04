import { BaseApi } from '../BaseApi'
import type { Active, DynamicAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class DynamicAccountCollection extends BaseApi {

    /**
     * Dynamic (One-Time Use) Account
     *
     * The Dynamic Account is a temporary virtual account generated on demand to receive a single payment transaction.
     *
     * HTTP POST /v1/collections/dynamic-account
     * Operation ID: postV1CollectionsDynamicAccount
     *
     * @param body Request body Type: DynamicAccountInput
     * @returns Created Active
     */
    async create (body: DynamicAccountInput): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/collections/dynamic-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}