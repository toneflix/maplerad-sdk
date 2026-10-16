import { BaseApi } from '../BaseApi'
import type { Country as CountryModel } from '../Schema'

export class Country extends BaseApi {

    /**
     * Get all Countries
     *
     * This resources returns a list of all countries (allowed on Maplerad) and information about them.
     *
     * HTTP GET /v1/countries
     * Operation ID: getV1Countries
     * @returns 200 CountryModel[]
     */
    async list (): Promise<CountryModel[]> {
        await this.core.validateAccess()

        const { data } = await this.core.http.send<CountryModel[]>(
            this.core.builder.buildTargetUrl('/v1/countries', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}