const service_name = "Show"
const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')
const role = require('../services/role')
const staff = require('../services/staff')

module.exports = {
    createShow: async (info) =>
    {
        try
        {
            const params = [ 'category_name', 'name', 'description', 'running_time', 'age_limit', 'poster_uri', 'video_uri', 'default_ticket_image_uri' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
            }

            const result = await prisma.Show.create({
                data,
            })

            if (info[ 'staff' ])
            {
                const staffs = info[ 'staff' ].split(',')

                for (let staff_name of staffs)
                {
                    const { staff_id } = await staff.createStaff({
                        name: staff_name.trim(),
                        image_uri: null
                    })

                    await role.createRole({
                        occupation: "스태프",
                        staff_id,
                        show_id: result.show_id
                    })
                }
            }

            logger.info(`[Service] ${ service_name } ::: createShow ::: ${ JSON.stringify(info) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: createShow ::: ${ e }`)
        }
    },
    setShow: async (showId, info) =>
    {
        try
        {
            const params = [ 'category_name', 'name', 'description', 'running_time', 'age_limit', 'poster_uri', 'video_uri', 'default_ticket_image_uri' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
            }

            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data
            })

            logger.info(`[Service] ${ service_name } ::: setShow ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setShow ::: ${ e }`)

            return 500
        }
    },
    setCategoryName: async (showId, info) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    category_name: info[ 'category_name' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setCategoryName ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setCategoryName ::: ${ e }`)

            return 500
        }
    },
    setName: async (showId, info) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
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
    setDescription: async (showId, info) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
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
    setRunningTime: async (showId, info) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    running_time: info[ 'running_time' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setRunningTime ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setRunningTime ::: ${ e }`)

            return 500
        }
    },
    setAgeLimit: async (showId, info) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    age_limit: info[ 'age_limit' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setAgeLimit ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setAgeLimit ::: ${ e }`)

            return 500
        }
    },
    setVideoURI: async (showId, iinfo) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    video_uri: info[ 'video_uri' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setVideoURI ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setVideoURI ::: ${ e }`)

            return 500
        }
    },
    setPosterURI: async (showId, info) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    poster_uri: info[ 'poster_uri' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setPosterURI ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setPosterURI ::: ${ e }`)

            return 500
        }
    },
    setDefaultTicketImageURI: async (showId, info) =>
    {
        try
        {
            await prisma.Show.update({
                where: {
                    show_id: Number(showId),
                },
                data: {
                    default_ticket_image_uri: info[ 'image_uri' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setDefaultTicketImageURI ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setDefaultTicketImageURI ::: ${ e }`)

            return 500
        }
    },
    addShowScheduleAddress: async (showId, info) =>
    {
        try
        {
            let data = {
                show_id: Number(showId)
            }

            if (info[ 'address' ]) data[ 'address' ] = info[ 'address' ]
            if (info[ 'show_schedule_id' ]) data[ 'show_schedule_id' ] = Number(info[ 'show_schedule_id' ])

            if (!data[ 'address' ]) return 400

            const result = await prisma.Address.create({
                data
            })

            logger.info(`[Service] ${ service_name } ::: addShowScheduleAddress ::: ${ JSON.stringify(info) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: addShowScheduleAddress ::: ${ e }`)

            return 500
        }
    },
    getShow: async (showId, query) =>
    {
        try
        {
            let ret
            let include = { 
                Role: { select: { staff_id: true } },
                Address: { select: { address: true } }
            }

            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
                },
                include
            })

            ret = (({ Address, Role, ...result }) => ({ ...result, show_schedule_address: Address.map(el => el.address), staffs: Role.map(el => el.staff_id) }))(result)
            if (!query.is_raw) 
            {
                let staff_names = []

                for (const staff_id of ret['staffs']){
                    const {name} = await staff.getName(staff_id)
                    staff_names.push(name)
                }

                ret['staffs'] = staff_names.join(',')
            }

            logger.info(`[Service] ${ service_name } ::: getShow ::: ${ JSON.stringify(ret) }`)

            return ret
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getShow ::: ${ e }`)

            return 500
        }
    },
    getAllShow: async (query) =>
    {
        try
        {
            let ret
            let include = { 
                Role: { select: { staff_id: true } },
                Address: { select: { address: true } }
            }

            const result = await prisma.Show.findMany({
                include
            })

            ret = result.map(({ Address, Role, ...result }) => ({ ...result, show_schedule_address: Address.map(el => el.address), staffs: Role.map(el => el.staff_id) }))
            if (!query.is_raw) 
            {
                for (const el of ret)
                {
                    let staff_names = []
    
                    for (const staff_id of el['staffs']){
                        const {name} = await staff.getName(staff_id)
                        staff_names.push(name)
                    }
    
                    el['staffs'] = staff_names.join(',')
                }
            }

            logger.info(`[Service] ${ service_name } ::: getAllShow ::: ${ JSON.stringify(ret) }`)

            return ret
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getAllShow ::: ${ e }`)

            return 500
        }
    },
    getCategoryName: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
                },
                select: {
                    category_name: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getCategoryName ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getCategoryName ::: ${ e }`)

            return 500
        }
    },
    getName: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
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
    getDescription: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
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
    getRunningTime: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
                },
                select: {
                    running_time: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getRunningTime ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getRunningTime ::: ${ e }`)

            return 500
        }
    },
    getAgeLimit: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
                },
                select: {
                    age_limit: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getAgeLimit ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getAgeLimit ::: ${ e }`)

            return 500
        }
    },
    getVideoURI: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
                },
                select: {
                    video_uri: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getVideoURI ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getVideoURI ::: ${ e }`)

            return 500
        }
    },
    getPosterURI: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
                },
                select: {
                    poster_uri: true,
                },
            })

            logger.info(`[Service] ${ service_name } ::: getPosterURI ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getPosterURI ::: ${ e }`)

            return 500
        }
    },
    getDefaultTicketImageURI: async (showId) =>
    {
        try
        {
            const result = await prisma.Show.findUnique({
                where: {
                    show_id: Number(showId)
                },
                select: {
                    default_ticket_image_uri: true
                },
            })

            logger.info(`[Service] ${ service_name } ::: getDefaultTicketImageURI ::: ${ JSON.stringify(result) }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getDefaultTicketImageURI ::: ${ e }`)

            return 500
        }
    },
    getShowScheduleAddress: async (showId, info) =>
    {
        try
        {
            let ret

            const result = await prisma.Address.findMany({
                where: { show_id: Number(showId) }
            })

            ret = result.reduce((prev, cur) => { prev.push(info[ 'verbose' ] ? cur : cur[ 'address' ]); return prev }, [])

            logger.info(`[Service] ${ service_name } ::: getShowScheduleAddress ::: ${ JSON.stringify(ret) }`)

            return ret
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getShowScheduleAddress ::: ${ e }`)

            return 500
        }
    },
    getRole: async (showId) =>
    {
        try
        {
            let ret

            const result = await prisma.Role.findMany({
                where: { show_id: Number(showId) },
                include: {
                    Staff: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            ret = result

            logger.info(`[Service] ${ service_name } ::: getRole ::: ${ JSON.stringify(ret) }`)

            return ret
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getRole ::: ${ e }`)

            return 500
        }
    },
    getCategoryNames: async (query) =>
    {
        try
        {
            const result = await prisma.Show.groupBy({
                by: [ 'category_name' ],
            })

            const ret = result.reduce((prev, cur) => { prev.push(cur[ 'category_name' ]); return prev }, [])

            logger.info(`[Service] ${ service_name } ::: getCategoryNames ::: ${ JSON.stringify(ret) }`)

            return ret
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getCategoryNames ::: ${ e }`)

            return 500
        }
    },
    search: async (query) =>
    {
        try
        {
            let where = {}
            let include
            let orderBy = []
            let OR = []
            let skip, take
            let ret

            const string_params = [ 'category_name', 'name', 'description' ]
            const range_params = [ 'min_running_time', 'max_running_time', 'min_age_limit', 'max_age_limit' ]

            for (let param of [ ...string_params, ...range_params ])
            {
                if (!query[ param ]) continue

                if (string_params.includes(param))
                {
                    if (Array.isArray(query[ param ]))
                    {
                        for (let i of query[ param ])
                        {
                            OR = [ ...OR, { [ param ]: { contains: i } } ]
                        }
                        where = { ...where, OR }
                    }
                    else
                    {
                        where = { [ param ]: { contains: query[ param ] } }
                    }
                }
                else if (range_params.includes(param))
                {
                    const param_name = param.split('_').filter((el, idx) => idx > 0).join('_')
                    where[ param_name ] = {
                        ...where[ param_name ],
                        ...(param.includes('min') && { gte: Number(query[ param ]) }),
                        ...(param.includes('max') && { lte: Number(query[ param ]) })
                    }
                }
            }
            console.log(where)

            include = { 
                Role: { select: { staff_id: true } },
                Address: { select: { address: true } }
            }

            if (query[ 'sort_by' ])
            {
                if (Array.isArray(query[ 'sort_by' ]))
                {
                    for (let i = 0; i < query[ 'sort_by' ].length; i++)
                    {
                        if (Array.isArray(query[ 'order_by' ]))
                        {
                            orderBy = [ ...orderBy, { [ query[ 'sort_by' ][ i ] ]: query[ 'order_by' ][ i ] ? query[ 'order_by' ][ i ] : 'asc' } ]
                        }
                        else
                        {
                            orderBy = [ ...orderBy, { [ query[ 'sort_by' ][ i ] ]: query[ 'order_by' ] } ]
                        }
                    }
                }
                else 
                {
                    orderBy = { [ query[ 'sort_by' ] ]: query[ 'order_by' ] ? query[ 'order_by' ] : 'asc' }
                }
            } else {
                orderBy = { 'show_id': 'desc' }
            }

            if (query[ 'offset' ]) skip = Number(query[ 'offset' ])
            if (query[ 'limit' ]) take = Number(query[ 'limit' ])

            const result = await prisma.Show.findMany({
                where,
                include,
                orderBy,
                skip,
                take,
            })

            ret = result.map(({ Address, Role, ...result }) => ({ ...result, show_schedule_address: Address.map(el => el.address), staffs: Role.map(el => el.staff_id) }))
            if (!query.is_raw) 
            {
                for (const el of ret)
                {
                    let staff_names = []
    
                    for (const staff_id of el['staffs']){
                        const {name} = await staff.getName(staff_id)
                        staff_names.push(name)
                    }
    
                    el['staffs'] = staff_names.join(',')
                }
            }

            logger.info(`[Service] ${ service_name } ::: search ::: ${ JSON.stringify(ret) }`)

            return ret
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: search ::: ${ e }`)

            return 500
        }
    }
}
