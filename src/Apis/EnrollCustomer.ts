import { BaseApi } from '../BaseApi'
import type { Customer, EnrollInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class EnrollCustomer extends BaseApi {

    /**
     * Enroll Customer (Full)
     *
     * This endpoint is a direct way to create a customer on Maplerad. The customer will have access to all Maplerad resources including Issuing.
     *
     * HTTP POST /v1/customers/enroll
     * Operation ID: postV1CustomersEnroll
     *
     * @param body Request body Type: EnrollInput
     * @returns 200 Customer
     */
    async create (body: EnrollInput): Promise<Customer> {
        await this.core.validateAccess()

        const { data } = await Http.send<Customer>(
            this.core.builder.buildTargetUrl('/v1/customers/enroll', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}