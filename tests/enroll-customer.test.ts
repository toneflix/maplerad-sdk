import { beforeEach, describe, expect, it, vi } from 'vitest'

import { EnrollCustomer } from '../src/Apis/EnrollCustomer'

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

describe('EnrollCustomer.create', () => {
    const body = {
        address: { country: 'NG', state: 'Lagos' },
        country: 'NG',
        dob: '1990-01-01',
        email: 'customer@example.test',
        first_name: 'Existing',
        identification_number: '12345678901',
        identity: {
            country: 'NG',
            number: '12345678901',
            type: 'NIN' as const,
        },
        last_name: 'Customer',
        phone: {
            phone_country_code: '+234',
            phone_number: '8012345678',
        },
        photo: 'photo-data',
    }
    const validateAccess = vi.fn().mockResolvedValue(undefined)
    const buildTargetUrl = vi.fn().mockImplementation(path => path)
    const enrollmentApi = new EnrollCustomer({
        validateAccess,
        builder: { buildTargetUrl },
    } as any)

    beforeEach(() => {
        sendMock.mockReset()
        validateAccess.mockClear()
        buildTargetUrl.mockClear()
    })

    it('manually attempts Tier 1 and Tier 2 for an existing customer', async () => {
        const existingCustomer = { id: 'customer_existing', email: body.email }
        sendMock
            .mockResolvedValueOnce({ data: [existingCustomer] })
            .mockResolvedValueOnce({ data: { status: true } })
            .mockResolvedValueOnce({ data: { id: existingCustomer.id, status: 'active' } })

        await expect(enrollmentApi.create(body)).resolves.toEqual(existingCustomer)
        expect(sendMock).toHaveBeenNthCalledWith(2, '/v1/customers/upgrade/tier1', 'PATCH', {
            address: body.address,
            customer_id: existingCustomer.id,
            dob: body.dob,
            identification_number: body.identification_number,
            phone: body.phone,
            photo: body.photo,
        }, {})
        expect(sendMock).toHaveBeenNthCalledWith(3, '/v1/customers/upgrade/tier2', 'PATCH', {
            customer_id: existingCustomer.id,
            identity: body.identity,
            photo: body.photo,
        }, {})
    })

    it('still attempts Tier 2 when the Tier 1 update fails', async () => {
        const existingCustomer = { id: 'customer_existing', email: body.email }
        sendMock
            .mockResolvedValueOnce({ data: [existingCustomer] })
            .mockRejectedValueOnce(new Error('Already at Tier 1'))
            .mockResolvedValueOnce({ data: { id: existingCustomer.id, status: 'active' } })

        await expect(enrollmentApi.create(body)).resolves.toEqual(existingCustomer)
        expect(sendMock).toHaveBeenCalledTimes(3)
        expect(buildTargetUrl).toHaveBeenCalledWith('/v1/customers/upgrade/tier2', {}, {})
    })

    it('returns the existing customer when the Tier 2 update fails', async () => {
        const existingCustomer = { id: 'customer_existing', email: body.email }
        sendMock
            .mockResolvedValueOnce({ data: [existingCustomer] })
            .mockResolvedValueOnce({ data: { status: true } })
            .mockRejectedValueOnce(new Error('Already at Tier 2'))

        await expect(enrollmentApi.create(body)).resolves.toEqual(existingCustomer)
        expect(sendMock).toHaveBeenCalledTimes(3)
    })

    it('uses full enrollment when no existing customer is found', async () => {
        const enrolledCustomer = { id: 'customer_new', email: body.email }
        sendMock
            .mockResolvedValueOnce({ data: [] })
            .mockResolvedValueOnce({ data: enrolledCustomer })

        await expect(enrollmentApi.create(body)).resolves.toEqual(enrolledCustomer)
        expect(sendMock).toHaveBeenNthCalledWith(
            2,
            '/v1/customers/enroll',
            'POST',
            body,
            {},
        )
    })
})
