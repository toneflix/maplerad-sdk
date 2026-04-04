import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, CustomerTransaction as CustomerTransactionModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CustomerTransaction extends BaseApi {

    /**
     * Get Customer Transactions
     *
     * This resource returns a list of all transactions a customer has made.
     *
     * HTTP GET /v1/customers/{id}/transactions
     * Operation ID: getV1CustomersIdTransactions
     *
     * @param params id: The customer ID Type: CustomerByIdParams
     * @returns 200 CustomerTransactionModel[]
     */
    async list (params: CustomerByIdParams): Promise<CustomerTransactionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerTransactionModel[]>(
            this.core.builder.buildTargetUrl('/v1/customers/{id}/transactions', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}