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
            if (info['show_schedule_id']) data['show_schedule_id'] = info['show_schedule_id']

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
    getShow : async (showId, query) =>{
        let ret;
        let include;
        
        if (query['include_address']) include = { Address: { select: { address: true } } }

        const result = await prisma.Show.findUnique({
            where: {
                show_id: Number(showId)
            },
            include
        })
        
        ret = query['include_address'] ? [result].map(({ Address, ...result }) => ({ ...result, show_schedule_address: Address.map(el => el.address) })) : result;

        logger.info('[Service] show ::: getShow ::: ' + JSON.stringify(ret))

        return ret
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
    getShowScheduleAddress : async (showId, info) =>{
        let ret

        const result = await prisma.Address.findMany({
            where: { show_id: Number(showId) }
        })

        ret = result.reduce((prev, cur) => { prev.push(info['verbose'] ? cur : cur['address']); return prev; }, []);

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
        let include
        let orderBy = []
        let OR = []
        let skip, take
        let ret

        const string_params = ['category_name', 'name', 'description']
        const range_params = ['min_running_time', 'max_running_time', 'min_age_limit', 'max_age_limit']
        
        for (var param of [...string_params, ...range_params])
        {
            if (!query[param]) continue;
            
            if (string_params.includes(param)) {
                if (Array.isArray(query[param]))
                {
                    for (var i of query[param])
                    {
                        OR = [ ...OR, { [param]: { contains: i } } ]
                    }
                    where = { ...where, OR };
                }
                else
                {
                    where = { [param]: { contains: query[param] } };
                }
            }
            else if (range_params.includes(param)) {
                const param_name = param.split('_').filter((el, idx) => idx > 0).join('_');
                where[param_name] = { 
                    ...where[param_name], 
                    ...(param.includes('min') && { gte: Number(query[param]) }), 
                    ...(param.includes('max') && { lte: Number(query[param]) })
                }
            }
        }
        console.log(where)

        if (query['include_address']) include = { Address: { select: { address: true } } }

        if (query['sort_by']) {
            if (Array.isArray(query['sort_by']))
            {
                for (var i = 0; i < query['sort_by'].length; i++)
                {
                    if (Array.isArray(query['order_by']))
                    {
                        orderBy = [...orderBy, { [query['sort_by'][i]]: query['order_by'][i] ? query['order_by'][i] : 'asc' }]
                    }
                    else
                    {
                        orderBy = [...orderBy, { [query['sort_by'][i]]: query['order_by'] }];
                    }
                }
            }
            else 
            {
                orderBy = { [query['sort_by']]: query['order_by'] ? query['order_by'] : 'asc' };
            }
        }
        console.log(orderBy)

        if (query['offset']) skip = Number(query['offset'])
        if (query['limit']) take = Number(query['limit'])
        
        const result = await prisma.Show.findMany({
            where,
            include,
            orderBy,
            skip,
            take,
        })

        ret = query['include_address'] ? result.map(({ Address, ...result }) => ({ ...result, show_schedule_address: Address.map(el => el.address) })) : result;

        logger.info('[Service] show ::: search ::: ' + JSON.stringify(ret))

        return ret
    },
}
