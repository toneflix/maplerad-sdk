import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, IssuingTransaction as IssuingTransactionModel, IssuingTransactionQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class IssuingTransaction extends BaseApi {

    /**
     * Get Card Transactions
     *
     * This resource allows you to retrieve all transactions made on a card.
     *
     * HTTP GET /v1/issuing/{id}/transactions
     * Operation ID: getV1IssuingIdTransactions
     *
     * @param params id: card id Type: CustomerByIdParams
     * @param query end_date: Return transactions created before and on this date. YYYY-MM-DD; page; page_size: Number of transactions to return per call; start_date: Return transactions created after and on this date. YYYY-MM-DD Type: IssuingTransactionQuery
     * @returns 200 IssuingTransactionModel[]
     */
    async list (params: CustomerByIdParams, query: IssuingTransactionQuery): Promise<IssuingTransactionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<IssuingTransactionModel[]>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/transactions', params, query),
            'GET',
            {},
            {}
        )

        return data
    }
}