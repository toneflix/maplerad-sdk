import { BaseApi } from '../BaseApi'
import type { Tier1 as Tier1Model, Tier1Input } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Tier1 extends BaseApi {

    /**
     * Upgrade Customer (Tier 1)
     *
     * This resource allows for a customer to be upgraded to tier one in order to process services like Collections.
     *
     * HTTP PATCH /v1/customers/upgrade/tier1
     * Operation ID: patchV1CustomersUpgradeTier1
     *
     * @param body Request body Type: Tier1Input
     * @returns 200 Tier1Model
     */
    async update (body: Tier1Input): Promise<Tier1Model> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1Model>(
            this.core.builder.buildTargetUrl('/v1/customers/upgrade/tier1', {}, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}