import { BaseApi } from '../BaseApi'
import type { CustomerAccount as CustomerAccountModel, CustomerByIdParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CustomerAccount extends BaseApi {

    /**
     * Get Customer Accounts
     *
     * This resource returns the accounts created by a customer.
     *
     * HTTP GET /v1/customers/{id}/accounts
     * Operation ID: getV1CustomersIdAccounts
     *
     * @param params id: The customer ID Type: CustomerByIdParams
     * @returns 200 CustomerAccountModel[]
     */
    async list (params: CustomerByIdParams): Promise<CustomerAccountModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerAccountModel[]>(
            this.core.builder.buildTargetUrl('/v1/customers/{id}/accounts', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}