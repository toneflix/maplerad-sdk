import { BaseApi } from '../BaseApi'
import type { Tier2 as Tier2Model, Tier2Input } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Tier2 extends BaseApi {

    /**
     * Upgrade Customer (Tier 2)
     *
     * This resource allows a customer to be upgraded to tier two.
     *
     * HTTP PATCH /v1/customers/upgrade/tier2
     * Operation ID: patchV1CustomersUpgradeTier2
     *
     * @param body Request body Type: Tier2Input
     * @returns 200 Tier2Model
     */
    async update (body: Tier2Input): Promise<Tier2Model> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier2Model>(
            this.core.builder.buildTargetUrl('/v1/customers/upgrade/tier2', {}, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}