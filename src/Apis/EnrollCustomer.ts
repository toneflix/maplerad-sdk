import type { Customer as CustomerModel, EnrollInput } from '../Schema'

import { BaseApi } from '../BaseApi'
import { Customer } from './Customer'
import { Http } from '@oapiex/sdk-kit'
import { Tier1 } from './Tier1'
import { Tier2 } from './Tier2'

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
    async create (body: EnrollInput): Promise<CustomerModel> {
        await this.core.validateAccess()

        const customer = (await new Customer(this.core).list({ email: body.email }))
            .find(customer => customer.email?.toLowerCase() === body.email.toLowerCase())

        if (customer?.id) {
            try {
                await new Tier1(this.core).update({
                    address: body.address,
                    customer_id: customer.id,
                    dob: body.dob,
                    identification_number: body.identification_number,
                    phone: body.phone,
                    photo: body.photo,
                })
            } catch {
                // The customer may already be at Tier 1; Tier 2 can still be attempted.
            }

            try {
                await new Tier2(this.core).update({
                    customer_id: customer.id,
                    identity: body.identity,
                    photo: body.photo,
                })
            } catch {
                // Enrollment remains idempotent when the customer is already at Tier 2.
            }

            return customer
        }

        const { data } = await Http.send<CustomerModel>(
            this.core.builder.buildTargetUrl('/v1/customers/enroll', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}
