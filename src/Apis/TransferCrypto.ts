import { BaseApi } from '../BaseApi'
import type { Transfer, TransferInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class TransferCrypto extends BaseApi {

    /**
     * Transfer
     *
     * This endpoint allows you to initiate a stablecoin withdrawal.
     *
     * HTTP POST /v1/crypto/transfer
     * Operation ID: postV1CryptoTransfer
     *
     * @param body Request body Type: TransferInput
     * @returns 200 Transfer
     */
    async create (body: TransferInput): Promise<Transfer> {
        await this.core.validateAccess()

        const { data } = await Http.send<Transfer>(
            this.core.builder.buildTargetUrl('/v1/crypto/transfer', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}