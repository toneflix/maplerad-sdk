import { BaseApi } from '../BaseApi'
import type { IssuingTransactionQuery, WalletHistory, WalletHistoryByCurrencyCodeParams, WalletHistoryByCurrencyCodeQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class HistoryWallet extends BaseApi {

    /**
     * Get Wallets History
     *
     * This resource returns the history of transactions in a wallet.
     *
     * HTTP GET /v1/wallets/history
     * Operation ID: getV1WalletsHistory
     *
     * @param query end_date: Return transactions created before and on this date. YYYY-MM-DD; page; page_size; start_date: Return transactions created after and on this date. YYYY-MM-DD Type: IssuingTransactionQuery
     * @returns 200 WalletHistory[]
     */
    async list (query: IssuingTransactionQuery): Promise<WalletHistory[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<WalletHistory[]>(
            this.core.builder.buildTargetUrl('/v1/wallets/history', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }

    /**
     * Get Wallets History by Currency
     *
     * This resource returns wallet history sorted by the currency code.
     *
     * HTTP GET /v1/wallets/{currency_code}/history
     * Operation ID: getV1WalletsCurrencyCodeHistory
     *
     * @param params currency_code: e.g NGN for Naira, USD for dollars Type: WalletHistoryByCurrencyCodeParams
     * @param query end_date: Return transactions created before and on this date. YYYY-MM-DD; page; page_size; start_date: Return transactions created after and on this date. YYYY-MM-DD Type: WalletHistoryByCurrencyCodeQuery
     * @returns 200 WalletHistory[]
     */
    async get (params: WalletHistoryByCurrencyCodeParams, query: WalletHistoryByCurrencyCodeQuery): Promise<WalletHistory[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<WalletHistory[]>(
            this.core.builder.buildTargetUrl('/v1/wallets/{currency_code}/history', params, query),
            'GET',
            {},
            {}
        )

        return data
    }
}