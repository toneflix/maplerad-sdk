import { BaseApi } from '../BaseApi'
import type { Active, Fx as FxModel, FxInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Fx extends BaseApi {

    /**
     * Exchange Currency
     *
     * This resource processes the currency exchange.
     *
     * HTTP POST /v1/fx
     * Operation ID: postV1Fx
     *
     * @param body Request body Type: FxInput
     * @returns 201 FxModel
     */
    async create (body: FxInput): Promise<FxModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<FxModel>(
            this.core.builder.buildTargetUrl('/v1/fx', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    /**
     * Get FX History
     *
     * This resource returns a list of all FX transactions processed.
     *
     * HTTP GET /v1/fx
     * Operation ID: getV1Fx
     * @returns 200 Active
     */
    async list (): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/fx', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}