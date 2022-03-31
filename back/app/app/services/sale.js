const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createSale : async (info) =>{
        await prisma.Sale.create({
            data: info,
        })

        logger.info('[Service] sale ::: createSale ::: ' + JSON.stringify(info))
    },
    setSale : async (info) =>{
        try {
            const params = ['show_schedule_id', 'description', 'started_at', 'ended_at']
            let data = {}

            for (var param of params)
            {
                if (info[param]) data[param] = info[param]
            }

            await prisma.Sale.update({
                where: {
                    sale_id: info['sale_id'],
                },
                data
            })

            logger.error('[Service] sale ::: setSale ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] sale ::: setSale ::: ' + e)

            return 500
        }
    },
    setShowScheduleId : async (info) =>{
        try {
            await prisma.Sale.update({
                where: {
                    sale_id: info['sale_id'],
                },
                data: {
                    show_schedule_id: info['show_schedule_id'],
                },
            })

            logger.error('[Service] sale ::: setShowScheduleId ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] sale ::: setShowScheduleId ::: ' + e)

            return 500
        }
    },
    setDescription : async (info) =>{
        try {
            await prisma.Sale.update({
                where: {
                    sale_id: info['sale_id'],
                },
                data: {
                    description: info['description'],
                },
            })

            logger.error('[Service] sale ::: setDescription ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] sale ::: setDescription ::: ' + e)

            return 500
        }
    },
    setStartedAt : async (info) =>{
        try {
            await prisma.Sale.update({
                where: {
                    sale_id: info['sale_id'],
                },
                data: {
                    started_at: info['started_at'],
                },
            })

            logger.error('[Service] sale ::: setStartedAt ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] sale ::: setStartedAt ::: ' + e)

            return 500
        }
    },
    setEndedAt : async (info) =>{
        try {
            await prisma.Sale.update({
                where: {
                    sale_id: info['sale_id'],
                },
                data: {
                    ended_at: info['ended_at'],
                },
            })

            logger.error('[Service] sale ::: setEndedAt ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] sale ::: setEndedAt ::: ' + e)

            return 500
        }
    },
    getSale : async (saleId) =>{
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

        result.forEach(el => {
            logger.info('[Service] sale ::: getSale ::: ' + JSON.stringify(el))
        });

        return result
    },
    getShowScheduleId : async (saleId) =>{
        const result = await prisma.Sale.findUnique({
            where: {
                sale_id: Number(saleId)
            },
            select: {
                show_schedule_id: true,
            },
        })

        result.forEach(el => {
            logger.info('[Service] sale ::: getShowScheduleId ::: ' + JSON.stringify(el))
        });

        return result
    },
    getDescription : async (saleId) =>{
        const result = await prisma.Sale.findUnique({
            where: {
                sale_id: Number(saleId)
            },
            select: {
                description: true,
            },
        })

        result.forEach(el => {
            logger.info('[Service] sale ::: getDescription ::: ' + JSON.stringify(el))
        });

        return result
    },
    getStartedAt : async (saleId) =>{
        const result = await prisma.Sale.findUnique({
            where: {
                sale_id: Number(saleId)
            },
            select: {
                started_at: true,
            },
        })

        result.forEach(el => {
            logger.info('[Service] sale ::: getStartedAt ::: ' + JSON.stringify(el))
        });

        return result
    },
    getEndedAt : async (saleId) =>{
        const result = await prisma.Sale.findUnique({
            where: {
                sale_id: Number(saleId)
            },
            select: {
                ended_at: true,
            },
        })

        result.forEach(el => {
            logger.info('[Service] sale ::: getEndedAt ::: ' + JSON.stringify(el))
        });

        return result
    },
    getImageURIBySaleId : async (saleId) =>{
        const result = await prisma.Ticket_images.findMany({
            where: {
                sale_id: Number(saleId)
            },
            select: {
                uri: true,
            },
        })

        result.forEach(el => {
            logger.info('[Service] sale ::: getImageURIBySaleId ::: ' + JSON.stringify(el))
        });

        return result
    },
}