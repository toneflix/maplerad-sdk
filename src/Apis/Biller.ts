import { BaseApi } from '../BaseApi'
import type { Biller as BillerModel, BillerParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Biller extends BaseApi {

    /**
     * Get Billers
     *
     * This resource retrieves the available billers for a particular country
     *
     * HTTP GET /v1/bills/airtime/billers/{country}
     * Operation ID: getV1BillsAirtimeBillersCountry
     *
     * @param params country: The country code e.g GH for Ghana, NG for Nigeria Type: BillerParams
     * @returns 200 BillerModel[]
     */
    async get (params: BillerParams): Promise<BillerModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<BillerModel[]>(
            this.core.builder.buildTargetUrl('/v1/bills/airtime/billers/{country}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}