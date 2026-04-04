import { BaseApi } from '../BaseApi'
import type { Rail, RailParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountRail extends BaseApi {

    /**
     * Supported Rails
     *
     * Get supported payment rails for account
     *
     * HTTP GET /v1/collections/virtual-account/{account_id}/rails
     * Operation ID: getV1CollectionsVirtualAccountAccountIdRails
     *
     * @param params account_id: Virtual Account ID Type: RailParams
     * @returns 200 Rail[]
     */
    async list (params: RailParams): Promise<Rail[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<Rail[]>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/{account_id}/rails', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}