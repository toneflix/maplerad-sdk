import { BaseApi } from '../BaseApi'
import type { Fetch, FetchInput } from '../Schema'

export class FetchInstitution extends BaseApi {

    /**
     * Fetch Bank Details
     *
     * This resource fetches additional details of an institution from a routing number.
     *
     * HTTP POST /v1/institutions/fetch
     * Operation ID: postV1InstitutionsFetch
     *
     * @param body Request body Type: FetchInput
     * @returns 200 Fetch
     */
    async create (body: FetchInput): Promise<Fetch> {
        await this.core.validateAccess()

        const { data } = await this.core.http.send<Fetch>(
            this.core.builder.buildTargetUrl('/v1/institutions/fetch', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}