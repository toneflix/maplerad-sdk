import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Issuing as IssuingModel, IssuingGetIssuingQuery, IssuingInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Issuing extends BaseApi {

    /**
     * Create a Card
     *
     * This resource allows you to create a card for a customer. This operation is asynchronous, meaning we notify you via a webhook event on the final status.
     *
     * HTTP POST /v1/issuing
     * Operation ID: postV1Issuing
     *
     * @param body Request body Type: IssuingInput
     * @returns 200 IssuingModel
     */
    async create (body: IssuingInput): Promise<IssuingModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<IssuingModel>(
            this.core.builder.buildTargetUrl('/v1/issuing', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Get all Cards
     *
     * This resource returns all cards created.
     *
     * HTTP GET /v1/issuing
     * Operation ID: getV1Issuing
     *
     * @param query brand: The card brand; created_at: When the card was created.; customer_id: This is used to return all cards for a particular customer; page: For pagination; page_size: The total amount of cards that will be returned for this request.; status: The status of the card Type: IssuingGetIssuingQuery
     * @returns 200 IssuingModel[]
     */
    async list (query: IssuingGetIssuingQuery): Promise<IssuingModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<IssuingModel[]>(
            this.core.builder.buildTargetUrl('/v1/issuing', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }

    /**
     * Get a Card
     *
     * This resource returns a card and its details
     *
     * HTTP GET /v1/issuing/{id}
     * Operation ID: getV1IssuingId
     *
     * @param params id: the card id or reference Type: CustomerByIdParams
     * @returns 200 IssuingModel
     */
    async get (params: CustomerByIdParams): Promise<IssuingModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<IssuingModel>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}