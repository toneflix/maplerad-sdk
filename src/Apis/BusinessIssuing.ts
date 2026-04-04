import { BaseApi } from '../BaseApi'
import type { Business, BusinessInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BusinessIssuing extends BaseApi {

    /**
     * Create a Business Card
     *
     * This resource is used to create a card for a business.
     *
     * HTTP POST /v1/issuing/business
     * Operation ID: postV1IssuingBusiness
     *
     * @param body Request body Type: BusinessInput
     * @returns 200 Business
     */
    async create (body: BusinessInput): Promise<Business> {
        await this.core.validateAccess()

        const { data } = await Http.send<Business>(
            this.core.builder.buildTargetUrl('/v1/issuing/business', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}