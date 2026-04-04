import { BaseApi } from '../BaseApi'
import type { Active, UpdateInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class UpdateCustomer extends BaseApi {

    /**
     * Update Customer
     *
     * This resource is used to update customer information.
     *
     * HTTP PATCH /v1/customers/update
     * Operation ID: patchV1CustomersUpdate
     *
     * @param body Request body Type: UpdateInput
     * @returns 200 Active
     */
    async update (body: UpdateInput): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/customers/update', {}, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}