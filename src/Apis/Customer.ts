import { BaseApi } from '../BaseApi'
import type { Customer as CustomerModel, CustomerByIdParams, CustomerInput, CustomerQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Customer extends BaseApi {

    /**
     * Create a Customer (Tier 0)
     *
     * This resource enables the creation of a new customer. A customer ID is returned which can be used for further actions within the Maplerad ecosystem.
     *
     * HTTP POST /v1/customers
     * Operation ID: postV1Customers
     *
     * @param body Request body Type: CustomerInput
     * @returns 200 CustomerModel
     */
    async create (body: CustomerInput): Promise<CustomerModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerModel>(
            this.core.builder.buildTargetUrl('/v1/customers', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Get Customers by Query
     *
     * This resource retrieves all customers created
     *
     * HTTP GET /v1/customers
     * Operation ID: getV1Customers
     *
     * @param query email: Filters customers by email address.; end_date; page; page_size; search: A way to find a particular customer; start_date; status: Status of the customer registration Type: CustomerQuery
     * @returns 200 CustomerModel[]
     */
    async list (query: CustomerQuery): Promise<CustomerModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerModel[]>(
            this.core.builder.buildTargetUrl('/v1/customers', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }

    /**
     * Get a Customer
     *
     * This resource retrieves a particular customer details
     *
     * HTTP GET /v1/customers/{id}
     * Operation ID: getV1CustomersId
     *
     * @param params id: The customer ID Type: CustomerByIdParams
     * @returns 200 CustomerModel
     */
    async get (params: CustomerByIdParams): Promise<CustomerModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerModel>(
            this.core.builder.buildTargetUrl('/v1/customers/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}