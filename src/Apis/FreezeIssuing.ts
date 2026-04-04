import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class FreezeIssuing extends BaseApi {

    /**
     * Freeze a Card
     *
     * This resource allows a card created on Maplerad to be frozen. When a card is frozen no transaction (funding/withdrawal) will be allowed.
     *
     * HTTP PATCH /v1/issuing/{id}/freeze
     * Operation ID: patchV1IssuingIdFreeze
     *
     * @param params id: card id Type: CustomerByIdParams
     * @returns 200 Tier1
     */
    async update (params: CustomerByIdParams): Promise<Tier1> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/freeze', params, {}),
            'PATCH',
            {},
            {}
        )

        return data
    }
}