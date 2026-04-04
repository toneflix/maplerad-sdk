import { BaseApi } from '../BaseApi'
import type { VirtualAccountStatus as VirtualAccountStatusModel, VirtualAccountStatusParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountStatus extends BaseApi {

    /**
     * Check Account Request Status
     *
     * This help to check the status of the USD account request.
     *
     * HTTP GET /v1/collections/virtual-account/status/{reference}
     * Operation ID: getV1CollectionsVirtualAccountStatusReference
     *
     * @param params reference Type: VirtualAccountStatusParams
     * @returns 200 VirtualAccountStatusModel
     */
    async get (params: VirtualAccountStatusParams): Promise<VirtualAccountStatusModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<VirtualAccountStatusModel>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/status/{reference}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}