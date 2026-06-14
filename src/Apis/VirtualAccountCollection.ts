import { BaseApi } from '../BaseApi'
import type { CustomerAccount, CustomerByIdParams, VirtualAccountById, VirtualAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'
import { VirtualAccountCustomer } from './VirtualAccountCustomer'

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
        const existingAccount = await this.findExistingAccount(body)

        if (existingAccount) return existingAccount

        try {
            await this.core.validateAccess()

            const { data } = await Http.send<CustomerAccount>(
                this.core.builder.buildTargetUrl('/v1/collections/virtual-account', {}, {}),
                'POST',
                body ?? {},
                {}
            )

            return data
        } catch (error) {
            if (!this.accountAlreadyExists(error)) throw error

            const recoveredAccount = await this.findExistingAccount(body, true)
            if (recoveredAccount) return recoveredAccount

            throw error
        }
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

    private async findExistingAccount (
        body: VirtualAccountInput,
        required = false
    ): Promise<CustomerAccount | undefined> {
        try {
            const accounts = await new VirtualAccountCustomer(this.core).get({
                customer_id: body.customer_id,
            })

            return accounts.find(account =>
                account.currency?.toUpperCase() === body.currency.toUpperCase()
            )
        } catch (error) {
            if (required) throw error

            return undefined
        }
    }

    private accountAlreadyExists (error: unknown): boolean {
        const data = (error as { data?: { message?: unknown } } | null)?.data
        const message = String(data?.message ?? (error as Error | null)?.message ?? '')

        return /(?:customer|virtual )?account already exists?|customer already exists?|already has (?:a )?(?:virtual )?account/i.test(message)
    }
}
