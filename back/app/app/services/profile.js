const service_name = 'Profile'
const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createProfile: async (info) =>
    {
        const result = await prisma.Profile.create({
            data: info,
        })

        logger.info(`[Service] ${ service_name } ::: createProfile ::: ${ JSON.stringify(info) }`)

        return result
    },
    getAllProfile: async function ()
    {
        const result = await prisma.Profile.findMany();

        logger.info(`[Service] ${ service_name } ::: getAllProfile ::: ${ JSON.stringify(result) }`)

        return result
    },
    getProfile: async function (walletId)
    {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
        })

        logger.info(`[Service] ${ service_name } ::: getProfile ::: ${ JSON.stringify(result) }`)

        return result
    },
    getNickname: async (walletId) =>
    {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
            select: {
                nickname: true,
            },
        })

        logger.info(`[Service] ${ service_name } ::: getNickname ::: ${ JSON.stringify(result) }`)

        return result
    },
    getAddressByNickname: async (nickname) =>
    {
        const result = await prisma.Profile.findMany({
            where: {
                nickname: nickname
            },
            select: {
                wallet_id: true,
            },
        })

        logger.info(`[Service] ${ service_name } ::: getAddressByNickname ::: ${ JSON.stringify(result) }`)

        return result
    },
    getCreatedAt: async (walletId) =>
    {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
            select: {
                created_at: true,
            },
        })

        logger.info(`[Service] ${ service_name } ::: getCreatedAt ::: ${ JSON.stringify(result) }`)

        return result
    },
    getDescription: async (walletId) =>
    {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
            select: {
                description: true,
            },
        })

        logger.info(`[Service] ${ service_name } ::: getDescription ::: ${ JSON.stringify(result) }`)

        return result
    },
    getImageURI: async (walletId) =>
    {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
            select: {
                image_uri: true,
            },
        })

        logger.info(`[Service] ${ service_name } ::: getImageURI ::: ${ JSON.stringify(result) }`)

        return result
    },
    getGallery: async (walletId) =>
    {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
            select: {
                gallery: true,
            },
        })

        logger.info(`[Service] ${ service_name } ::: getImageURI ::: ${ JSON.stringify(result) }`)

        return result
    },
    getRandomNickname: async () =>
    {
        try
        {
            const adjective = await prisma.$queryRaw`SELECT adjective FROM RandomAdjective order by rand() limit 1`
            const noun = await prisma.$queryRaw`SELECT noun FROM RandomNoun order by rand() limit 1`

            logger.error(`[Service] ${ service_name } ::: getRandomNickname ::: ${ adjective[ 0 ].adjective } ${ noun[ 0 ].noun }`)

            return `${ adjective[ 0 ].adjective } ${ noun[ 0 ].noun }`
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: getRandomNickname ::: ${ e }`)

            return '닉네임생성실패'
        }
    },
    setProfile: async (info) =>
    {
        try
        {
            const params = [ 'nickname', 'description', 'image_uri', 'gallery' ]
            let data = {}

            for (let param of params)
            {
                if (info[ param ]) data[ param ] = info[ param ]
            }

            await prisma.Profile.update({
                where: {
                    wallet_id: info[ 'wallet_id' ],
                },
                data
            })

            logger.info(`[Service] ${ service_name } ::: setProfile ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setProfile ::: ${ e }`)

            return 500
        }
    },
    setNickname: async (info) =>
    {
        try
        {
            await prisma.Profile.update({
                where: {
                    wallet_id: info[ 'wallet_id' ],
                },
                data: {
                    nickname: info[ 'nickname' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setNickname ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setNickname ::: ${ e }`)

            return 500
        }
    },
    setDescription: async (info) =>
    {
        try
        {
            await prisma.Profile.update({
                where: {
                    wallet_id: info[ 'wallet_id' ],
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
    setImageURI: async (info) =>
    {
        try
        {
            await prisma.Profile.update({
                where: {
                    wallet_id: info[ 'wallet_id' ],
                },
                data: {
                    image_uri: info[ 'image_uri' ],
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
    setGallery: async (info) =>
    {
        try
        {
            await prisma.Profile.update({
                where: {
                    wallet_id: info[ 'wallet_id' ],
                },
                data: {
                    gallery: info[ 'gallery' ],
                },
            })

            logger.info(`[Service] ${ service_name } ::: setGallery ::: ${ JSON.stringify(info) }`)

            return 200
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: setGallery ::: ${ e }`)

            return 500
        }
    },
}
