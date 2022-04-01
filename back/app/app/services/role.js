const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createRole : async (info) =>{
        const params = ['occupation', 'staff_id', 'show_id']
        let data = {}

        for (var param of params)
        {
            if (info[param]) data[param] = info[param]
            else return
        }

        const result = await prisma.Role.create({
            data
        })

        logger.info('[Service] role ::: createRole ::: ' + JSON.stringify(info))

        return result
    },
    setRole : async (info) =>{
        try {
            const params = ['occupation']
            let data = {}

            for (var param of params)
            {
                if (info[param]) data[param] = info[param]
            }

            await prisma.Role.update({
                where: {
                    staff_id_show_id: {
                        show_id: Number(info['show_id']),
                        staff_id: Number(info['staff_id']),
                    }
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
    getRole : async (showId, staffId) =>{
        const result = await prisma.Role.findUnique({
            where: {
                staff_id_show_id: {
                    show_id: Number(showId),
                    staff_id: Number(staffId),
                }
            },
            include: {
                Show: {
                    select: {
                        name: true
                    }
                },
                Staff: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const ret = {
            staff_id: result["staff_id"],
            staff_name: result["Staff"]["name"],
            show_id: result["show_id"],
            show_name: result["Show"]["name"],
            occupation: result["occupation"]
        }

        logger.info('[Service] role ::: getRole ::: ' + JSON.stringify(ret))

        return ret
    }
}
