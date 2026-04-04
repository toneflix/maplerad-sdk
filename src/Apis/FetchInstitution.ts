import { BaseApi } from '../BaseApi'
import type { Fetch, FetchInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

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

        const { data } = await Http.send<Fetch>(
            this.core.builder.buildTargetUrl('/v1/institutions/fetch', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}