import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Fund, FundInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class WithdrawIssuing extends BaseApi {

    /**
     * Withdraw from a Card
     *
     * This resource enables the debit of a card with a specified amount. The amount will be credited into your Maplerad balance
     *
     * HTTP POST /v1/issuing/{id}/withdraw
     * Operation ID: postV1IssuingIdWithdraw
     *
     * @param params id: the card id Type: CustomerByIdParams
     * @param body Request body Type: FundInput
     * @returns 200 Fund
     */
    async create (params: CustomerByIdParams, body: FundInput): Promise<Fund> {
        await this.core.validateAccess()

        const { data } = await Http.send<Fund>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/withdraw', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}