import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Customer } from '../src/Apis/Customer'

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

describe('Customer.create', () => {
    const input = {
        country: 'NG',
        email: 'customer@example.test',
        first_name: 'Existing',
        last_name: 'Customer',
    }
    const validateAccess = vi.fn().mockResolvedValue(undefined)
    const buildTargetUrl = vi.fn((path, _params, query) => `${path}?${new URLSearchParams(query).toString()}`)
    const customerApi = new Customer({
        validateAccess,
        builder: { buildTargetUrl },
    } as any)

    beforeEach(() => {
        sendMock.mockReset()
        validateAccess.mockClear()
        buildTargetUrl.mockClear()
    })

    it('returns an existing customer with the same email without creating another', async () => {
        const existingCustomer = { id: 'customer_existing', ...input }
        sendMock.mockResolvedValueOnce({ data: [existingCustomer] })

        await expect(customerApi.create(input)).resolves.toEqual(existingCustomer)
        expect(sendMock).toHaveBeenCalledTimes(1)
        expect(sendMock).toHaveBeenCalledWith(
            '/v1/customers?email=customer%40example.test',
            'GET',
            {},
            {},
        )
    })

    it('creates a customer when no exact email match exists', async () => {
        const createdCustomer = { id: 'customer_new', ...input }
        sendMock
            .mockResolvedValueOnce({ data: [] })
            .mockResolvedValueOnce({ data: createdCustomer })

        await expect(customerApi.create(input)).resolves.toEqual(createdCustomer)
        expect(sendMock).toHaveBeenNthCalledWith(
            1,
            '/v1/customers?email=customer%40example.test',
            'GET',
            {},
            {},
        )
        expect(sendMock).toHaveBeenNthCalledWith(
            2,
            '/v1/customers?',
            'POST',
            input,
            {},
        )
    })
})
