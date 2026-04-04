import { BaseApi } from '../BaseApi'
import type { Usd, UsdTransferInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class UsdTransfer extends BaseApi {

    /**
     * US Payments (ACH/Wire)
     *
     * This resource allows you send USD to a registered counterparty. NOTE: This is a v2 endpoint.
     *
     * HTTP POST /v2/transfers/usd
     * Operation ID: postV2TransfersUsd
     *
     * @param body Request body Type: UsdTransferInput
     * @returns 200 Usd
     */
    async create (body: UsdTransferInput): Promise<Usd> {
        await this.core.validateAccess()

        const { data } = await Http.send<Usd>(
            this.core.builder.buildTargetUrl('/v2/transfers/usd', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}