const service_name = "Staff"
const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createStaff: async (info) =>
    {
        try
        {
            const params = [ 'name', 'image_uri' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
                else return
            }

            const result = await prisma.Staff.create({
                data
            })

            logger.info(`[Service] ${ service_name } ::: createStaff ::: ${ JSON.stringify(info) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: createStaff ::: ${ e }`)
        }
    },
    setStaff: async (info) =>
    {
        try
        {
            const params = [ 'name', 'image_uri' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
            }

            await prisma.staff.update({
                where: {
                    staff_id: info[ 'staff_id' ],
                },
                data
            })

            logger.info(`[Service] ${ service_name } ::: setStaff ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setStaff ::: ${ e }`)

            return 500
        }
    },
    setName: async (info) =>
    {
        try
        {
            await prisma.Staff.update({
                where: {
                    staff_id: info[ 'staff_id' ],
                },
                data: {
                    name: info[ 'name' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setName ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setName ::: ${ e }`)

            return 500
        }
    },
    setImageURI: async (info) =>
    {
        try
        {
            await prisma.Staff.update({
                where: {
                    staff_id: info[ 'staff_id' ],
                },
                data: {
                    imageURL: info[ 'image_uri' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setImageURI ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setImageURI ::: ${ e }`)

            return 500
        }
    },
    getStaff: async (staffId) =>
    {
        try
        {
            const result = await prisma.Staff.findUnique({
                where: {
                    staff_id: Number(staffId)
                },
                select: {
                    staff_id: true,
                    name: true,
                    imageURL: true
                },
            })

            logger.info(`[Service] ${ service_name } ::: getStaff ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getStaff ::: ${ e }`)

            return 500
        }
    },
    getName: async (staffId) =>
    {
        try
        {
            const result = await prisma.Staff.findUnique({
                where: {
                    staff_id: Number(staffId)
                },
                select: {
                    name: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getName ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getName ::: ${ e }`)

            return 500
        }
    },
    getImageURI: async (staffId) =>
    {
        try
        {
            const result = await prisma.Staff.findUnique({
                where: {
                    staff_id: Number(staffId)
                },
                select: {
                    image_uri: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getImageURI ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getImageURI ::: ${ e }`)

            return 500
        }
    }
    // getImageURIByStaffId : async (staffId) =>{
    //     const result = await prisma.Ticket_images.findMany({
    //         where: {
    //             staff_id: Number(staffId)
    //         },
    //         select: {
    //             uri: true,
    //         },
    //     })

    //     result.forEach(el => {
    //         logger.info('[Service] staff ::: getImageURIByStaffId ::: ' + JSON.stringify(el))
    //     });

    //     return result
    // },
}