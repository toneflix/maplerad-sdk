import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Transaction as TransactionModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Transaction extends BaseApi {

    /**
     * Get All Transactions
     *
     * This resource returns a list of all transactions processed.
     *
     * HTTP GET /v1/transactions
     * Operation ID: getV1Transactions
     * @returns 200 TransactionModel[]
     */
    async list (): Promise<TransactionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransactionModel[]>(
            this.core.builder.buildTargetUrl('/v1/transactions', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }

    /**
     * Get Transaction By ID/Reference
     *
     * This resource retrieves details of a transaction by its id or reference
     *
     * HTTP GET /v1/transactions/{id}
     * Operation ID: getV1TransactionsId
     *
     * @param params id: The ID or Reference for the transaction Type: CustomerByIdParams
     * @returns 200 TransactionModel
     */
    async get (params: CustomerByIdParams): Promise<TransactionModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransactionModel>(
            this.core.builder.buildTargetUrl('/v1/transactions/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}