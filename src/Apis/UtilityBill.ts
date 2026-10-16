import { BaseApi } from '../BaseApi'
import type { Utility, UtilityInput } from '../Schema'

export class UtilityBill extends BaseApi {

    /**
     * Buy Energy/Utility
     *
     * This resource allows you pay for energy/utility bills for Kenyan customers.
     *
     * HTTP POST /v1/bills/utility
     * Operation ID: postV1BillsUtility
     *
     * @param body Request body Type: UtilityInput
     * @returns 200 Utility
     */
    async create (body: UtilityInput): Promise<Utility> {
        await this.core.validateAccess()

        const { data } = await this.core.http.send<Utility>(
            this.core.builder.buildTargetUrl('/v1/bills/utility', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}