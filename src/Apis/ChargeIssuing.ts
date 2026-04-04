import { BaseApi } from '../BaseApi'
import type { Charge, ChargeQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ChargeIssuing extends BaseApi {

    /**
     * Card Decline Charges
     *
     * This endpoint retrieves a list of card-declined charges.
     *
     * HTTP GET /v1/issuing/charges
     * Operation ID: getV1IssuingCharges
     *
     * @param query channel; end_date; page; page_size; search: Get Card Charge by debit reference; start_date; transaction_id: Card Charge by Transaction ID Type: ChargeQuery
     * @returns 200 Charge[]
     */
    async list (query: ChargeQuery): Promise<Charge[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<Charge[]>(
            this.core.builder.buildTargetUrl('/v1/issuing/charges', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }
}