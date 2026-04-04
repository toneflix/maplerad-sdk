import { BaseApi } from '../BaseApi'
import type { Active, AddonParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class AddonCable extends BaseApi {

    /**
     * Get Cable Addons
     *
     * This resource enables you to get cable tv add-ons for a particular network.
     *
     * HTTP GET /v1/bills/cable/addon/{biller}/{addon_id}
     * Operation ID: getV1BillsCableAddonBillerAddonId
     *
     * @param params addon_id; biller Type: AddonParams
     * @returns 200 Active
     */
    async get (params: AddonParams): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/bills/cable/addon/{biller}/{addon_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}