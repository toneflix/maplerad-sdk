import { BaseApi } from '../BaseApi'
import type { Quote, QuoteInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class QuoteFx extends BaseApi {

    /**
     * Generate FX quote
     *
     * This resource generates a foreign exchange quote. Generating a quote is the first step to processing a currency exchange
     *
     * HTTP POST /v1/fx/quote
     * Operation ID: postV1FxQuote
     *
     * @param body Request body Type: QuoteInput
     * @returns 201 Quote
     */
    async create (body: QuoteInput): Promise<Quote> {
        await this.core.validateAccess()

        const { data } = await Http.send<Quote>(
            this.core.builder.buildTargetUrl('/v1/fx/quote', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}