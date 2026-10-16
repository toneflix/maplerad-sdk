import { BaseApi } from '../BaseApi'
import type { Resolve, ResolveInput } from '../Schema'

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

        const { data } = await this.core.http.send<Resolve>(
            this.core.builder.buildTargetUrl('/v1/institutions/resolve', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}