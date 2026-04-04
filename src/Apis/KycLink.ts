import { BaseApi } from '../BaseApi'
import type { KycLinkInput, Usd } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class KycLink extends BaseApi {

    /**
     * Create Account(USD) KYC Link
     *
     * This resource enables the request a KYC Link to get a USD account. A reference ID is returned which can be used to get the account request status.
     *
     * HTTP POST /v1/collections/usd/kyc_link
     * Operation ID: postV1CollectionsUsdKycLink
     *
     * @param body Request body Type: KycLinkInput
     * @returns Usd
     */
    async create (body: KycLinkInput): Promise<Usd> {
        await this.core.validateAccess()

        const { data } = await Http.send<Usd>(
            this.core.builder.buildTargetUrl('/v1/collections/usd/kyc_link', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}