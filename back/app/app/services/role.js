const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createRole : async (info) =>{
        await prisma.Role.create({
            data: info,
        })

        logger.info('[Service] role ::: createRole ::: ' + JSON.stringify(info))
    },
    setRole : async (info) =>{
        try {
            const params = ['occupation', 'staff_id', 'show_id']
            let data = {}

            for (var param of params)
            {
                if (info[param]) data[param] = info[param]
            }

            await prisma.role.update({
                where: {
                    role_id: info['role_id'],
                },
                data
            })

            logger.error('[Service] role ::: setRole ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] role ::: setRole ::: ' + e)

            return 500
        }
    },
    setOccupation : async (info) =>{
        try {
            await prisma.Role.update({
                where: {
                    role_id: info['role_id'],
                },
                data: {
                    occupation: info['occupation'],
                },
            })

            logger.error('[Service] role ::: setOccupation ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] role ::: setOccupation ::: ' + e)

            return 500
        }
    },
    setStaffId : async (info) =>{
        try {
            await prisma.Role.update({
                where: {
                    role_id: info['role_id'],
                },
                data: {
                    staff_id: info['staff_id'],
                },
            })

            logger.error('[Service] role ::: setStaffId ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] role ::: setStaffId ::: ' + e)

            return 500
        }
    },
    setShowId : async (info) =>{
        try {
            await prisma.Role.update({
                where: {
                    role_id: info['role_id'],
                },
                data: {
                    show_id: info['show_id'],
                },
            })

            logger.error('[Service] role ::: setShowId ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] role ::: setShowId ::: ' + e)

            return 500
        }
    },
    getRole : async (roleId) =>{
        const result = await prisma.Role.findUnique({
            where: {
                role_id: Number(roleId)
            },
            select: {
                occupation: true,
                staff_id: true,
                show_id: true
            },
        })

        result.forEach(el => {
            logger.info('[Service] role ::: getRole ::: ' + JSON.stringify(el))
        });

        return result
    },
    getOccupation : async (roleId) =>{
        const result = await prisma.Role.findUnique({
            where: {
                role_id: Number(roleId)
            },
            select: {
                occupation: true
            },
        })

        result.forEach(el => {
            logger.info('[Service] role ::: getOccupation ::: ' + JSON.stringify(el))
        });

        return result
    },
    getStaffId : async (roleId) =>{
        const result = await prisma.Role.findUnique({
            where: {
                role_id: Number(roleId)
            },
            select: {
                staff_id: true
            },
        })

        result.forEach(el => {
            logger.info('[Service] role ::: getStaffId ::: ' + JSON.stringify(el))
        });

        return result
    },
    getShowId : async (roleId) =>{
        const result = await prisma.Role.findUnique({
            where: {
                role_id: Number(roleId)
            },
            select: {
                show_id: true
            },
        })

        result.forEach(el => {
            logger.info('[Service] role ::: getShowId ::: ' + JSON.stringify(el))
        });

        return result
    },
}