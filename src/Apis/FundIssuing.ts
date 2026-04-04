import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Fund, FundInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class FundIssuing extends BaseApi {

    /**
     * Fund a Card
     *
     * This resource enables a customer to credit their card with a specified amount. The amount will be debited from your Maplerad balance.
     *
     * HTTP POST /v1/issuing/{id}/fund
     * Operation ID: postV1IssuingIdFund
     *
     * @param params id: The card id Type: CustomerByIdParams
     * @param body Request body Type: FundInput
     * @returns 200 Fund
     */
    async create (params: CustomerByIdParams, body: FundInput): Promise<Fund> {
        await this.core.validateAccess()

        const { data } = await Http.send<Fund>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/fund', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}