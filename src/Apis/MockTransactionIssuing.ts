import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, MockTransaction, MockTransactionInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class MockTransactionIssuing extends BaseApi {

    /**
     * Mock Card Transaction
     *
     * This resource enables you to mock a card transaction. It works only on the sandbox environment .
     *
     * HTTP POST /v1/test/issuing/{id}/mock-transaction
     * Operation ID: postV1TestIssuingIdMockTransaction
     *
     * @param params id: The test card ID Type: CustomerByIdParams
     * @param body Request body Type: MockTransactionInput
     * @returns 200 MockTransaction
     */
    async create (params: CustomerByIdParams, body: MockTransactionInput): Promise<MockTransaction> {
        await this.core.validateAccess()

        const { data } = await Http.send<MockTransaction>(
            this.core.builder.buildTargetUrl('/v1/test/issuing/{id}/mock-transaction', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}