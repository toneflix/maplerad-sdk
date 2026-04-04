import { BaseApi } from '../BaseApi'
import type { Data, DataInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class DataBill extends BaseApi {

    /**
     * Buy Data
     *
     * HTTP POST /v1/bills/data
     * Operation ID: postV1BillsData
     *
     * @param body Request body Type: DataInput
     * @returns 200 Data
     */
    async create (body: DataInput): Promise<Data> {
        await this.core.validateAccess()

        const { data } = await Http.send<Data>(
            this.core.builder.buildTargetUrl('/v1/bills/data', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}