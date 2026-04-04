import { BaseApi } from '../BaseApi'
import type { MockTransactionCollectionInput, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class MockTransaction extends BaseApi {

    /**
     * Mock Collection Transaction
     *
     * This resource helps to mock a collection transaction.
     *
     * HTTP POST /v1/test/collection/mock-transaction
     * Operation ID: postV1TestCollectionMockTransaction
     *
     * @param body Request body Type: MockTransactionCollectionInput
     * @returns 200 Tier1
     */
    async create (body: MockTransactionCollectionInput): Promise<Tier1> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.core.builder.buildTargetUrl('/v1/test/collection/mock-transaction', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}