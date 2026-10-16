import { BaseApi } from '../BaseApi'
import type { ResolveAccount as ResolveAccountModel, ResolveAccountInput } from '../Schema'

export class ResolveAccount extends BaseApi {

    /**
     * Resolve Electricity Meter Account
     *
     * HTTP POST /v1/bills/electricity/resolve-account
     * Operation ID: postV1BillsElectricityResolveAccount
     *
     * @param body Request body Type: ResolveAccountInput
     * @returns 200 ResolveAccountModel
     */
    async create (body: ResolveAccountInput): Promise<ResolveAccountModel> {
        await this.core.validateAccess()

        const { data } = await this.core.http.send<ResolveAccountModel>(
            this.core.builder.buildTargetUrl('/v1/bills/electricity/resolve-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}