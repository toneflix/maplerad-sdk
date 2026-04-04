import { BaseApi } from '../BaseApi'
import type { Bundle, BundleParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BundleBill extends BaseApi {

    /**
     * Get Available Bundles
     *
     * HTTP GET /v1/bills/{bill_type}/bundle/{biller}
     * Operation ID: getV1BillsBillTypeBundleBiller
     *
     * @param params bill_type; biller Type: BundleParams
     * @returns 200 Bundle[]
     */
    async get (params: BundleParams): Promise<Bundle[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<Bundle[]>(
            this.core.builder.buildTargetUrl('/v1/bills/{bill_type}/bundle/{biller}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}