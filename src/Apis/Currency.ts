import { BaseApi } from '../BaseApi'
import type { Currency as CurrencyModel } from '../Schema'

export class Currency extends BaseApi {

    /**
     * Get all Currencies
     *
     * This resource provides a list of all currencies
     *
     * HTTP GET /v1/currencies
     * Operation ID: getV1Currencies
     * @returns 200 CurrencyModel[]
     */
    async list (): Promise<CurrencyModel[]> {
        await this.core.validateAccess()

        const { data } = await this.core.http.send<CurrencyModel[]>(
            this.core.builder.buildTargetUrl('/v1/currencies', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}