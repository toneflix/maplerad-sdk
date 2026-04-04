import { BaseApi } from '../BaseApi'
import type { VerifyOtp as VerifyOtpModel, VerifyOtpInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VerifyOtp extends BaseApi {

    /**
     * Verify OTP
     *
     * If the transaction requires OTP then we need to call the verify otp endpoint
     *
     * HTTP POST /v1/collections/momo/verify-otp
     * Operation ID: postV1CollectionsMomoVerifyOtp
     *
     * @param body Request body Type: VerifyOtpInput
     * @returns 200 VerifyOtpModel
     */
    async create (body: VerifyOtpInput): Promise<VerifyOtpModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<VerifyOtpModel>(
            this.core.builder.buildTargetUrl('/v1/collections/momo/verify-otp', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}