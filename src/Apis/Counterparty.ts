import { BaseApi } from '../BaseApi'
import type { Counterparty as CounterpartyModel, CounterpartyByCounterPartyIdParams, CounterpartyInput, CustomerByIdParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Counterparty extends BaseApi {

    /**
     * Create a Counterparty
     *
     * An account counterparty is a potential payment recipient from that account.
     *
     * HTTP POST /v1/collections/virtual-account/counterparties
     * Operation ID: postV1CollectionsVirtualAccountCounterparties
     *
     * @param body Request body Type: CounterpartyInput
     * @returns 200 CounterpartyModel
     */
    async create (body: CounterpartyInput): Promise<CounterpartyModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<CounterpartyModel>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/counterparties', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Get Counterparty By ID
     *
     * HTTP GET /v1/collections/virtual-account/counterparties/{counter_party_id}
     * Operation ID: getV1CollectionsVirtualAccountCounterpartiesCounterPartyId
     *
     * @param params counter_party_id Type: CounterpartyByCounterPartyIdParams
     * @returns 200 CounterpartyModel[]
     */
    async get (params: CounterpartyByCounterPartyIdParams): Promise<CounterpartyModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CounterpartyModel[]>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/counterparties/{counter_party_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }

    /**
     * Get Counterparty By Account ID
     *
     * HTTP GET /v1/collections/virtual-account/{id}/counterparties
     * Operation ID: getV1CollectionsVirtualAccountIdCounterparties
     *
     * @param params id Type: CustomerByIdParams
     * @returns 200 CounterpartyModel[]
     */
    async list (params: CustomerByIdParams): Promise<CounterpartyModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CounterpartyModel[]>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/{id}/counterparties', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}