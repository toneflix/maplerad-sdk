import { BaseApi } from '../BaseApi'
import type { Active, ActiveInput, ActiveParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ActiveCustomer extends BaseApi {

    /**
     * Whitelist/Blacklist a Customer
     *
     * This resource allows a customer to be blacklisted or whitelisted.
     *
     * HTTP POST /v1/customers/{customer_id}/active
     * Operation ID: postV1CustomersCustomerIdActive
     *
     * @param params customer_id Type: ActiveParams
     * @param body Request body Type: ActiveInput
     * @returns 200 Active
     */
    async create (params: ActiveParams, body: ActiveInput): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/customers/{customer_id}/active', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}