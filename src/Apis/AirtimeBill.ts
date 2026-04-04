import { BaseApi } from '../BaseApi'
import type { Airtime, AirtimeInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class AirtimeBill extends BaseApi {

    /**
     * Buy Airtime
     *
     * This resource enables the purchase of airtime
     *
     * HTTP POST /v1/bills/airtime
     * Operation ID: postV1BillsAirtime
     *
     * @param body Request body Type: AirtimeInput
     * @returns 201 Airtime
     */
    async create (body: AirtimeInput): Promise<Airtime> {
        await this.core.validateAccess()

        const { data } = await Http.send<Airtime>(
            this.core.builder.buildTargetUrl('/v1/bills/airtime', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Get Airtime History
     *
     * This resource retrieves all airtime purchase history
     *
     * HTTP GET /v1/bills/airtime
     * Operation ID: getV1BillsAirtime
     * @returns 200 Airtime[]
     */
    async list (): Promise<Airtime[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<Airtime[]>(
            this.core.builder.buildTargetUrl('/v1/bills/airtime', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}