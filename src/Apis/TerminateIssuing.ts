import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class TerminateIssuing extends BaseApi {

    /**
     * Terminate Card
     *
     * This resource allows a card created on Maplerad to be frozen. When a card is frozen no transaction (funding/withdrawal) will be allowed.
     *
     * HTTP PUT /v1/issuing/{id}/terminate
     * Operation ID: putV1IssuingIdTerminate
     *
     * @param params id: card id Type: CustomerByIdParams
     * @returns 200 Tier1
     */
    async update (params: CustomerByIdParams): Promise<Tier1> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/terminate', params, {}),
            'PUT',
            {},
            {}
        )

        return data
    }
}