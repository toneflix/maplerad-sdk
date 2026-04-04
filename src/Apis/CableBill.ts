import { BaseApi } from '../BaseApi'
import type { Cable, CableInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CableBill extends BaseApi {

    /**
     * Buy Cable TV
     *
     * This resource allows you to purchase cable TV subscription.
     *
     * HTTP POST /v1/bills/cable
     * Operation ID: postV1BillsCable
     *
     * @param body Request body Type: CableInput
     * @returns 200 Cable
     */
    async create (body: CableInput): Promise<Cable> {
        await this.core.validateAccess()

        const { data } = await Http.send<Cable>(
            this.core.builder.buildTargetUrl('/v1/bills/cable', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}