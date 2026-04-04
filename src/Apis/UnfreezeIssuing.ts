import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class UnfreezeIssuing extends BaseApi {

    /**
     * Unfreeze a Card
     *
     * This resource allows for the enabling of a previously frozen card created on Maplerad. When a card is enabled all transactions (funding/withdrawal) will be allowed.
     *
     * HTTP PATCH /v1/issuing/{id}/unfreeze
     * Operation ID: patchV1IssuingIdUnfreeze
     *
     * @param params id: card id Type: CustomerByIdParams
     * @returns 200 Tier1
     */
    async update (params: CustomerByIdParams): Promise<Tier1> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/unfreeze', params, {}),
            'PATCH',
            {},
            {}
        )

        return data
    }
}