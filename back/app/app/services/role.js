const service_name = 'Role'
const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createRole: async (info) =>
    {
        try
        {
            const params = [ 'occupation', 'staff_id', 'show_id' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
                else return
            }

            const result = await prisma.Role.create({
                data
            })

            logger.info(`[Service] ${ service_name } ::: createRole ::: ${ JSON.stringify(info) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: createRole ::: ${ e }`)
        }
    },
    setRole: async (info) =>
    {
        try
        {
            const params = [ 'occupation' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
            }

            await prisma.Role.update({
                where: {
                    staff_id_show_id: {
                        show_id: Number(info[ 'show_id' ]),
                        staff_id: Number(info[ 'staff_id' ]),
                    }
                },
                data
            })

            logger.info(`[Service] ${ service_name } ::: setRole ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setRole ::: ${ e }`)

            return 500
        }
    },
    getRole: async (showId, staffId) =>
    {
        try
        {
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
                staff_id: result[ "staff_id" ],
                staff_name: result[ "Staff" ][ "name" ],
                show_id: result[ "show_id" ],
                show_name: result[ "Show" ][ "name" ],
                occupation: result[ "occupation" ]
            }

            logger.info(`[Service] ${ service_name } ::: getRole ::: ${ JSON.stringify(ret) }`)

            return ret
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getRole ::: ${ e }`)
        }
    }
}
