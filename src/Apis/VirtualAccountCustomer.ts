import { BaseApi } from '../BaseApi'
import type { ActiveParams, CustomerAccount } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountCustomer extends BaseApi {

    /**
     * Get Customer Virtual Accounts
     *
     * This resource allows for the retrieval of virtual accounts created for a customer on Maplerad.
     *
     * HTTP GET /v1/customers/{customer_id}/virtual-account
     * Operation ID: getV1CustomersCustomerIdVirtualAccount
     *
     * @param params customer_id Type: ActiveParams
     * @returns 200 CustomerAccount[]
     */
    async get (params: ActiveParams): Promise<CustomerAccount[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerAccount[]>(
            this.core.builder.buildTargetUrl('/v1/customers/{customer_id}/virtual-account', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}