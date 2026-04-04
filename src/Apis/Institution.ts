import { BaseApi } from '../BaseApi'
import type { Institution as InstitutionModel, InstitutionQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Institution extends BaseApi {

    /**
     * Get all Institutions
     *
     * This resource returns a list of all institutions by type and country.
     *
     * HTTP GET /v1/institutions
     * Operation ID: getV1Institutions
     *
     * @param query country: The country ISO code. Find available countries here: https://maplerad.dev/reference/get-all-countries; page: The page number; page_size: The number of items to return; type: The type of method which you need an institution for. VIRTUAL is for creating virtual accounts, NUBAN is used for sending money to a NGN Bank account, BOG is used for sending money to a GHS Bank account, CBK is used for sending money to a KES Bank account. Type: InstitutionQuery
     * @returns 200 InstitutionModel[]
     */
    async list (query: InstitutionQuery): Promise<InstitutionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<InstitutionModel[]>(
            this.core.builder.buildTargetUrl('/v1/institutions', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }
}