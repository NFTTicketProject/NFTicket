const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createSale : async (info) =>{
        await prisma.Sale.create({
            data: info,
        })

        logger.info('[sale_service.js] createSale ::: ' + JSON.stringify(info))
    },
    setSale : async (info) =>{
        try {
            await prisma.Sale.update({
                where: {
                    sale_id: info['sale_id'],
                },
                data: {
                    show_schedule_id: info['show_schedule_id'],
                    description: info['description'],
                    started_at: info['started_at'],
                    ended_at: info['ended_at'],                    
                },
            })

            logger.error('[sale_service.js] setSale ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[sale_service.js] setSale ::: ' + e)

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

            logger.error('[sale_service.js] setShowScheduleId ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[sale_service.js] setShowScheduleId ::: ' + e)

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

            logger.error('[sale_service.js] setDescription ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[sale_service.js] setDescription ::: ' + e)

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

            logger.error('[sale_service.js] setStartedAt ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[sale_service.js] setStartedAt ::: ' + e)

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

            logger.error('[sale_service.js] setEndedAt ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[sale_service.js] setEndedAt ::: ' + e)

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
            logger.info('[sale_service.js] getSale ::: ' + JSON.stringify(el))
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
            logger.info('[sale_service.js] getShowScheduleId ::: ' + JSON.stringify(el))
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
            logger.info('[sale_service.js] getDescription ::: ' + JSON.stringify(el))
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
            logger.info('[sale_service.js] getStartedAt ::: ' + JSON.stringify(el))
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
            logger.info('[sale_service.js] getEndedAt ::: ' + JSON.stringify(el))
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
            logger.info('[sale_service.js] getImageURIBySaleId ::: ' + JSON.stringify(el))
        });

        return result
    },
}