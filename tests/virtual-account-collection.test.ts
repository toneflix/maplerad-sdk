import { beforeEach, describe, expect, it, vi } from 'vitest'

import { VirtualAccountCollection } from '../src/Apis/VirtualAccountCollection'

const { sendMock } = vi.hoisted(() => ({
    sendMock: vi.fn(),
}))

vi.mock('@oapiex/sdk-kit', async () => {
    const actual = await vi.importActual<typeof import('@oapiex/sdk-kit')>('@oapiex/sdk-kit')

    return {
        ...actual,
        Http: {
            ...actual.Http,
            send: sendMock,
        },
    }
})

describe('VirtualAccountCollection.create', () => {
    const input = {
        currency: 'NGN',
        customer_id: 'customer_existing',
    }
    const validateAccess = vi.fn().mockResolvedValue(undefined)
    const buildTargetUrl = vi.fn((path, params) =>
        path.replace('{customer_id}', params.customer_id ?? '')
    )
    const accountApi = new VirtualAccountCollection({
        validateAccess,
        builder: { buildTargetUrl },
    } as any)

    beforeEach(() => {
        sendMock.mockReset()
        validateAccess.mockClear()
        buildTargetUrl.mockClear()
    })

    it('returns an existing account for the same customer and currency', async () => {
        const existingAccount = {
            id: 'account_existing',
            account_number: '0123456789',
            currency: 'NGN',
        }
        sendMock.mockResolvedValueOnce({ data: [existingAccount] })

        await expect(accountApi.create(input)).resolves.toEqual(existingAccount)
        expect(sendMock).toHaveBeenCalledTimes(1)
        expect(sendMock).toHaveBeenCalledWith(
            '/v1/customers/customer_existing/virtual-account',
            'GET',
            {},
            {},
        )
    })

    it('creates an account when the customer has no account in that currency', async () => {
        const createdAccount = {
            id: 'account_new',
            account_number: '0123456789',
            currency: 'NGN',
        }
        sendMock
            .mockResolvedValueOnce({ data: [] })
            .mockResolvedValueOnce({ data: createdAccount })

        await expect(accountApi.create(input)).resolves.toEqual(createdAccount)
        expect(sendMock).toHaveBeenNthCalledWith(
            2,
            '/v1/collections/virtual-account',
            'POST',
            input,
            {},
        )
    })

    it('recovers an account created by a concurrent provisioning request', async () => {
        const existingAccount = {
            id: 'account_existing',
            account_number: '0123456789',
            currency: 'NGN',
        }
        sendMock
            .mockResolvedValueOnce({ data: [] })
            .mockRejectedValueOnce(Object.assign(
                new Error('Request Failed: Customer already exist'),
                { data: { message: 'Customer already exist' } },
            ))
            .mockResolvedValueOnce({ data: [existingAccount] })

        await expect(accountApi.create(input)).resolves.toEqual(existingAccount)
        expect(sendMock).toHaveBeenCalledTimes(3)
    })
})
