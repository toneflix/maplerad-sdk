import { BaseApi } from '../BaseApi'
import type { Resolve, ResolveInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ResolveInstitution extends BaseApi {

    /**
     * Resolve Institution Account
     *
     * Use this resource to confirm an account. Testing on Sandbox gives a dummy response. To get actual values change to Live.
     *
     * HTTP POST /v1/institutions/resolve
     * Operation ID: postV1InstitutionsResolve
     *
     * @param body Request body Type: ResolveInput
     * @returns 200 Resolve
     */
    async create (body: ResolveInput): Promise<Resolve> {
        await this.core.validateAccess()

        const { data } = await Http.send<Resolve>(
            this.core.builder.buildTargetUrl('/v1/institutions/resolve', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}