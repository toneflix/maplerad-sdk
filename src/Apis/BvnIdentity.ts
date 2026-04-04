import { BaseApi } from '../BaseApi'
import type { Bvn, BvnInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BvnIdentity extends BaseApi {

    /**
     * Verify BVN
     *
     * This resource checks for the validity of a BVN and returns its details.
     *
     * HTTP POST /v1/identity/bvn
     * Operation ID: postV1IdentityBvn
     *
     * @param body Request body Type: BvnInput
     * @returns 200 Bvn
     */
    async create (body: BvnInput): Promise<Bvn> {
        await this.core.validateAccess()

        const { data } = await Http.send<Bvn>(
            this.core.builder.buildTargetUrl('/v1/identity/bvn', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}