import { BaseApi } from '../BaseApi'
import type { Electricity, ElectricityInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ElectricityBill extends BaseApi {

    /**
     * Buy Electricity
     *
     * HTTP POST /v1/bills/electricity
     * Operation ID: postV1BillsElectricity
     *
     * @param body Request body Type: ElectricityInput
     * @returns 200 Electricity
     */
    async create (body: ElectricityInput): Promise<Electricity> {
        await this.core.validateAccess()

        const { data } = await Http.send<Electricity>(
            this.core.builder.buildTargetUrl('/v1/bills/electricity', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}