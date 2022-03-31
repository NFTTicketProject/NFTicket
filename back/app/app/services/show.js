const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createShow : async (info) =>{

        logger.info('[Service] show ::: createShow ::: ' + JSON.stringify(info))

        try {
            await prisma.Show.create({
                data: info,
            })
            return true
        }
        catch (e){
            logger.error('[Service] show ::: createShow ::: ' + JSON.stringify(e))

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

            logger.error('[Service] show ::: setShow ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setShow ::: ' + e)

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

            logger.error('[Service] show ::: setCategoryName ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setCategoryName ::: ' + e)

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

            logger.error('[Service] show ::: setName ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setName ::: ' + e)

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

            logger.error('[Service] show ::: setDescription ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setDescription ::: ' + e)

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

            logger.error('[Service] show ::: setRunningTime ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setRunningTime ::: ' + e)

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

            logger.error('[Service] show ::: setAgeLimit ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setAgeLimit ::: ' + e)

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

            logger.error('[Service] show ::: setVideoURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setVideoURI ::: ' + e)

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

            logger.error('[Service] show ::: setPosterURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setPosterURI ::: ' + e)

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

            logger.error('[Service] show ::: setDefaultTicketImageURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: setDefaultTicketImageURI ::: ' + e)

            return 500
        }
    },
    addShowScheduleAddress : async (showId, info) =>{
        try {
            var data = { 
                show_id: Number(showId) 
            }

            if (info['address']) data['address'] = info['address']

            if (!data['address']) return 400

            await prisma.Address.create({
                data
            })

            logger.error('[Service] show ::: addShowScheduleAddress ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] show ::: addShowScheduleAddress ::: ' + e)

            return 500
        }
    },
    getShow : async (showId) =>{
        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            }
        })

        logger.info('[Service] show ::: getShow ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getCategoryName ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getName ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getDescription ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getRunningTime ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getAgeLimit ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getVideoURI ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getPosterURI ::: ' + JSON.stringify(result))

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

        logger.info('[Service] show ::: getDefaultTicketImageURI ::: ' + JSON.stringify(result))

        return result
    },
    getShowScheduleAddress : async (showId) =>{
        let ret

        const result = await prisma.Address.findMany({
            where: { show_id: showId }
        })

        ret = result.reduce((prev, cur) => { prev.push(cur['address']); return prev; }, []);

        logger.info('[Service] show ::: getShowScheduleAddress ::: ' + JSON.stringify(ret))

        return ret
    },
    getCategoryNames : async (query) =>{
        const result = await prisma.Show.groupBy({
            by: ['category_name'],
        })

        const ret = result.reduce((prev, cur) => { prev.push(cur['category_name']); return prev; }, []);

        logger.info('[Service] show ::: getCategoryNames ::: ' + JSON.stringify(ret))

        return ret
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

        if (!Object.keys(where).legnth) return 400

        if (query['offset']) skip = Number(query['offset'])
        if (query['limit']) take = Number(query['limit'])
        
        const result = await prisma.Show.findMany({
            where,
            skip,
            take,
        })

        ret = result.reduce((prev, cur) => { prev.push(query['id_only'] ? cur['show_id'] : cur); return prev; }, []);

        logger.info('[Service] show ::: search ::: ' + JSON.stringify(ret))

        return ret
    },
}
