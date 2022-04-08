const service_name = 'Sale'
const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createSale: async (info) =>
    {
        try
        {
            const params = [ 'show_schedule_id', 'description', 'started_at', 'ended_at' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
                else return
            }

            const result = await prisma.Sale.create({
                data
            })

            logger.info(`[Service] ${ service_name } ::: createSale ::: ${ JSON.stringify(info) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: createSale ::: ${ e }`)
        }
    },
    setSale: async (info) =>
    {
        try
        {
            const params = [ 'show_schedule_id', 'description', 'started_at', 'ended_at' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
            }

            await prisma.Sale.update({
                where: {
                    sale_id: info[ 'sale_id' ],
                },
                data
            })

            logger.info(`[Service] ${ service_name } ::: setSale ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setSale ::: ${ e }`)

            return 500
        }
    },
    setShowScheduleId: async (info) =>
    {
        try
        {
            await prisma.Sale.update({
                where: {
                    sale_id: info[ 'sale_id' ],
                },
                data: {
                    show_schedule_id: info[ 'show_schedule_id' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setShowScheduleId ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setShowScheduleId ::: ${ e }`)

            return 500
        }
    },
    setDescription: async (info) =>
    {
        try
        {
            await prisma.Sale.update({
                where: {
                    sale_id: info[ 'sale_id' ],
                },
                data: {
                    description: info[ 'description' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setDescription ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setDescription ::: ${ e }`)

            return 500
        }
    },
    setStartedAt: async (info) =>
    {
        try
        {
            await prisma.Sale.update({
                where: {
                    sale_id: info[ 'sale_id' ],
                },
                data: {
                    started_at: info[ 'started_at' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setStartedAt ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setStartedAt ::: ${ e }`)

            return 500
        }
    },
    setEndedAt: async (info) =>
    {
        try
        {
            await prisma.Sale.update({
                where: {
                    sale_id: info[ 'sale_id' ],
                },
                data: {
                    ended_at: info[ 'ended_at' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setEndedAt ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setEndedAt ::: ${ e }`)

            return 500
        }
    },
    getAllSale: async (saleId) =>
    {
        try
        {

            const result = await prisma.Sale.findMany({
            })

            logger.info(`[Service] ${ service_name } ::: getAllSale ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getAllSale ::: ${ e }`)

            return 500
        }
    },
    getSale: async (saleId) =>
    {
        try
        {

            const result = await prisma.Sale.findUnique({
                where: {
                    sale_id: Number(saleId)
                },
                select: {
                    sale_id: true,
                    show_schedule_id: true,
                    description: true,
                    started_at: true,
                    ended_at: true
                },
            })

            logger.info(`[Service] ${ service_name } ::: getSale ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getSale ::: ${ e }`)

            return 500
        }
    },
    getShowScheduleId: async (saleId) =>
    {
        try
        {
            const result = await prisma.Sale.findUnique({
                where: {
                    sale_id: Number(saleId)
                },
                select: {
                    show_schedule_id: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getShowScheduleId ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getShowScheduleId ::: ${ e }`)

            return 500
        }
    },
    getDescription: async (saleId) =>
    {
        try
        {
            const result = await prisma.Sale.findUnique({
                where: {
                    sale_id: Number(saleId)
                },
                select: {
                    description: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getDescription ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getDescription ::: ${ e }`)

            return 500
        }
    },
    getStartedAt: async (saleId) =>
    {
        try
        {
            const result = await prisma.Sale.findUnique({
                where: {
                    sale_id: Number(saleId)
                },
                select: {
                    started_at: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getStartedAt ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getStartedAt ::: ${ e }`)

            return 500
        }
    },
    getEndedAt: async (saleId) =>
    {
        try
        {
            const result = await prisma.Sale.findUnique({
                where: {
                    sale_id: Number(saleId)
                },
                select: {
                    ended_at: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getEndedAt ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getEndedAt ::: ${ e }`)

            return 500
        }
    },
    getImageURIBySaleId: async (saleId) =>
    {
        try
        {
            const result = await prisma.Ticket_images.findMany({
                where: {
                    sale_id: Number(saleId)
                },
                select: {
                    uri: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getImageURIBySaleId ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getImageURIBySaleId ::: ${ e }`)

            return 500
        }
    }
}