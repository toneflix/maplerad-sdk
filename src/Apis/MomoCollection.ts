import { BaseApi } from '../BaseApi'
import type { Momo, MomoInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class MomoCollection extends BaseApi {

    /**
     * Mobile Money
     *
     * This resource allows a customer to receive mobile money payments.
     *
     * HTTP POST /v1/collections/momo
     * Operation ID: postV1CollectionsMomo
     *
     * @param body Request body Type: MomoInput
     * @returns 200 Momo
     */
    async create (body: MomoInput): Promise<Momo> {
        await this.core.validateAccess()

        const { data } = await Http.send<Momo>(
            this.core.builder.buildTargetUrl('/v1/collections/momo', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}