import { BaseApi } from '../BaseApi'
import type { CreditInput, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Credit extends BaseApi {

    /**
     * Credit Test Wallet
     *
     * The resource enables the credit of the sandbox wallet.
     *
     * HTTP POST /v1/test/wallet/credit
     * Operation ID: postV1TestWalletCredit
     *
     * @param body Request body Type: CreditInput
     * @returns 200 Tier1
     */
    async create (body: CreditInput): Promise<Tier1> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.core.builder.buildTargetUrl('/v1/test/wallet/credit', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}