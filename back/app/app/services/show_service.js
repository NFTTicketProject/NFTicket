const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createShow : async (info) =>{

        logger.info('[show_service.js] createShow ::: ' + JSON.stringify(info))

        try {
            await prisma.Show.create({
                data: info,
            })
            return true
        }
        catch (e){
            logger.error('[show_service.js] createShow ::: ' + JSON.stringify(e))

            return false
        }
    },
    setShow : async (showId, info) =>{
        try {
            const params = ['category_name', 'name', 'description', 'running_time', 'age_limit', 'poster_uri', 'video_uri', 'default_ticket_image_uri']
            let data = {}

            for (var param of params)
            {
                if (info[param]) data[param] = info[param]
            }

            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data
            })

            logger.error('[show_service.js] setShow ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setShow ::: ' + e)

            return 500
        }
    },
    setCategoryName : async (showId, info) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    category_name: info['category_name'],
                },
            })

            logger.error('[show_service.js] setCategoryName ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setCategoryName ::: ' + e)

            return 500
        }
    },
    setName : async (showId, info) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    name: info['name'],
                },
            })

            logger.error('[show_service.js] setName ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setName ::: ' + e)

            return 500
        }
    },
    setDescription : async (showId, info) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    description: info['description'],
                },
            })

            logger.error('[show_service.js] setDescription ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setDescription ::: ' + e)

            return 500
        }
    },
    setRunningTime : async (showId, info) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    running_time: info['running_time'],
                },
            })

            logger.error('[show_service.js] setRunningTime ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setRunningTime ::: ' + e)

            return 500
        }
    },
    setAgeLimit : async (showId, info) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    age_limit: info['age_limit'],
                },
            })

            logger.error('[show_service.js] setAgeLimit ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setAgeLimit ::: ' + e)

            return 500
        }
    },
    setVideoURI : async (showId, iinfo) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    video_uri: info['video_uri'],
                },
            })

            logger.error('[show_service.js] setVideoURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setVideoURI ::: ' + e)

            return 500
        }
    },
    setPosterURI : async (showId, info) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    poster_uri: info['poster_uri'],
                },
            })

            logger.error('[show_service.js] setPosterURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setPosterURI ::: ' + e)

            return 500
        }
    },
    setDefaultTicketImageURI : async (showId, info) =>{
        try {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    default_ticket_image_uri: info['image_uri'],
                },
            })

            logger.error('[show_service.js] setDefaultTicketImageURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[show_service.js] setDefaultTicketImageURI ::: ' + e)

            return 500
        }
    },
    getShow : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                category_name: true,
                name: true,
                description: true,
                running_time: true,
                age_limit: true,
                video_uri: true,
                poster_uri: true,
                default_ticket_image_uri: true
            },
        })

        logger.info('[show_service.js] getShow ::: ' + JSON.stringify(result))

        return result
    },
    getCategoryName : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                category_name: true,
            },
        })

        logger.info('[show_service.js] getCategoryName ::: ' + JSON.stringify(result))

        return result
    },
    getName : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                name: true,
            },
        })

        logger.info('[show_service.js] getName ::: ' + JSON.stringify(result))

        return result
    },
    getDescription : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                description: true,
            },
        })

        logger.info('[show_service.js] getDescription ::: ' + JSON.stringify(result))

        return result
    },
    getRunningTime : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                running_time: true,
            },
        })

        logger.info('[show_service.js] getRunningTime ::: ' + JSON.stringify(result))

        return result
    },
    getAgeLimit : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                age_limit: true,
            },
        })

        logger.info('[show_service.js] getAgeLimit ::: ' + JSON.stringify(result))

        return result
    },
    getVideoURI : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                video_uri: true,
            },
        })

        logger.info('[show_service.js] getVideoURI ::: ' + JSON.stringify(result))

        return result
    },
    getPosterURI : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                poster_uri: true,
            },
        })

        logger.info('[show_service.js] getPosterURI ::: ' + JSON.stringify(result))

        return result
    },
    getDefaultTicketImageURI : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            select: {
                default_ticket_image_uri: true
            },
        })

        logger.info('[show_service.js] getDefaultTicketImageURI ::: ' + JSON.stringify(result))

        return result
    },
    search : async (query) =>{
        let where = {}
        let skip, take
        let ret

        const params = ['category_name']
        for (var param of params)
        {
            if (query[param]) where[param] = query[param]
        }

        if (query['offset']) skip = Number(query['offset'])
        if (query['limit']) take = Number(query['limit'])
        
        const result = await prisma.Show.findMany({
            where,
            skip,
            take,
        })

        ret = result.reduce((prev, cur) => { prev.push(query['id_only'] ? cur['show_id'] : cur); return prev; }, []);

        logger.info('[show_service.js] search ::: ' + JSON.stringify(ret))

        return ret
    },
    getCategoryNames : async (query) =>{
        const result = await prisma.Show.groupBy({
            by: ['category_name'],
        })

        const ret = result.reduce((prev, cur) => { prev.push(cur['category_name']); return prev; }, []);

        logger.info('[show_service.js] getCategoryNames ::: ' + JSON.stringify(ret))

        return ret
    }
}
