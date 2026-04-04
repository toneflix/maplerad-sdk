import { BaseApi } from '../BaseApi'
import type { Transfer as TransferModel, TransferByTransferIdParams, TransferCreateInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Transfer extends BaseApi {

    /**
     * Local Payments (Africa)
     *
     * This resource enables a bank transfer from your maplerad balance. We currently have provision for NGN Bank Transfer, Mobile Money Transfer, Maplerad Pay (transfer to another Maplerad account).
     *
     * HTTP POST /v1/transfers
     * Operation ID: postV1Transfers
     *
     * @param body Request body Type: TransferCreateInput
     * @returns 200 TransferModel
     */
    async create (body: TransferCreateInput): Promise<TransferModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransferModel>(
            this.core.builder.buildTargetUrl('/v1/transfers', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Verify Transfer by ID/Reference
     *
     * This resource returns a transfer details by its reference or ID.
     *
     * HTTP GET /v1/transfers/{transfer_id}
     * Operation ID: getV1TransfersTransferId
     *
     * @param params transfer_id Type: TransferByTransferIdParams
     * @returns 200 TransferModel
     */
    async get (params: TransferByTransferIdParams): Promise<TransferModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransferModel>(
            this.core.builder.buildTargetUrl('/v1/transfers/{transfer_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}