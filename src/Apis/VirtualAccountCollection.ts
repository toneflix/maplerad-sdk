import { BaseApi } from '../BaseApi'
import type { CustomerAccount, CustomerByIdParams, VirtualAccountById, VirtualAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountCollection extends BaseApi {

    /**
     * Create Static Account
     *
     * This enables the creation of a virtual account for a customer. Money paid into this account gets deposited into the business wallet.
     *
     * HTTP POST /v1/collections/virtual-account
     * Operation ID: postV1CollectionsVirtualAccount
     *
     * @param body Request body Type: VirtualAccountInput
     * @returns 200 CustomerAccount
     */
    async create (body: VirtualAccountInput): Promise<CustomerAccount> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerAccount>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Get Virtual Account by ID
     *
     * This resource allows to retrieve an account by its ID.
     *
     * HTTP GET /v1/collections/virtual-account/{id}
     * Operation ID: getV1CollectionsVirtualAccountId
     *
     * @param params id Type: CustomerByIdParams
     * @returns 200 VirtualAccountById
     */
    async get (params: CustomerByIdParams): Promise<VirtualAccountById> {
        await this.core.validateAccess()

        const { data } = await Http.send<VirtualAccountById>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}