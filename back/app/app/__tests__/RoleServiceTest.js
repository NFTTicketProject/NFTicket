describe('Role Service Test', () => {
    beforeAll(() => {
        jest.mock('../services/role')
        const roleService = require('../services/role')
        const newinfo1 = {
            "staff_id": 52,
            "staff_name": "마크 해밀",
            "show_id": 22,
            "show_name": "스타워즈 에피소드 4 - 새로운 희망",
            "occupation": "스태프"
        }
        const newinfo2 = {
            "staff_id": 1,
            "staff_name": "더미",
            "show_id": 2,
            "show_name": "가짜이름",
            "occupation": "스태프"
        }

        roleService.createRole.mockReturnValue(newinfo1)
        roleService.getRole.mockImplementation((showId, staffId) => {
            if (showId === 22 && staffId === 52)
                return newinfo1
            return undefined
        })
        roleService.getAllRole.mockReturnValue([newinfo1, newinfo2])
    })

    test('createRole', async () => {
        const roleService = require('../services/role')
        const newinfo = {
            "staff_id": 52,
            "staff_name": "마크 해밀",
            "show_id": 22,
            "show_name": "스타워즈 에피소드 4 - 새로운 희망",
            "occupation": "스태프"
        }

        expect(await roleService.createRole(newinfo)).toStrictEqual(newinfo)
    })

    test('getRole', async () => {
        const roleService = require('../services/role')
        const result1 = await roleService.getRole(22, 52)

        expect(result1.staff_id).toStrictEqual(52)
        expect(result1.staff_name).toStrictEqual("마크 해밀")
        expect(result1.show_id).toStrictEqual(22)
        expect(result1.show_name).toStrictEqual("스타워즈 에피소드 4 - 새로운 희망")

        const result2 = await roleService.getRole(0, 0)

        expect(result2).toBeUndefined()
    })

    test('getAllRole', async () => {
        const roleService = require('../services/role')

        const result = await roleService.getAllRole()

        expect(result.length).toBeGreaterThan(0)
        expect(result[0].staff_id).toStrictEqual(52)
        expect(result[0].staff_name).toStrictEqual("마크 해밀")
        expect(result[0].show_id).toStrictEqual(22)
        expect(result[0].show_name).toStrictEqual("스타워즈 에피소드 4 - 새로운 희망")

        expect(result[1].staff_id).toStrictEqual(1)
        expect(result[1].staff_name).toStrictEqual("더미")
        expect(result[1].show_id).toStrictEqual(2)
        expect(result[1].show_name).toStrictEqual("가짜이름")
    })
});