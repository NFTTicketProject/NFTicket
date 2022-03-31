const text_generater = require('./text_generater')
const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createProfile : async (info) =>{
        await prisma.Profile.create({
            data : info,
        })

        logger.info('[Service] profile ::: createProfile ::: ' + JSON.stringify(info))
    },
    getProfile: async function (walletId) {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
        })

        logger.info('[Service] profile ::: getProfile ::: ' + JSON.stringify(result))

        return result
    },
    getNickname : async (walletId) =>{
        const result = await prisma.Profile.findFirst({
            where: {
                wallet_id: walletId,
            },
            select: {
                nickname: true,
            },
        })

        logger.info('[Service] profile ::: getNickname ::: ' + JSON.stringify(result))

        return result
    },
    getCreatedAt : async (walletId) =>{
        const result = await prisma.Profile.findFirst({
            where: {
                wallet_id: walletId,
            },
            select: {
                created_at: true,
            },
        })

        logger.info('[Service] profile ::: getCreatedAt ::: ' + JSON.stringify(result))

        return result
    },
    getDescription : async (walletId) =>{
        const result = await prisma.Profile.findFirst({
            where: {
                wallet_id: walletId,
            },
            select: {
                description: true,
            },
        })

        logger.info('[Service] profile ::: getDescription ::: ' + JSON.stringify(result))

        return result
    },
    getImageURI : async (walletId) =>{
        const result = await prisma.Profile.findFirst({
            where: {
                wallet_id: walletId,
            },
            select: {
                image_uri: true,
            },
        })

        logger.info('[Service] profile ::: getImageURI ::: ' + JSON.stringify(result))

        return result
    },
    getGallery : async (walletId) =>{
        const result = await prisma.Profile.findFirst({
            where: {
                wallet_id: walletId,
            },
            select: {
                gallery: true,
            },
        })

        logger.info('[Service] profile ::: getImageURI ::: ' + JSON.stringify(result))

        return result
    },
    setProfile : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    nickname: info['nickname'],
                    description: info['description'],
                    image_uri: info['image_uri'],
                },
            })

            logger.error('[Service] profile ::: setProfile ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] profile ::: setProfile ::: ' + e)

            return 500
        }
    },
    setNickname : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    nickname: info['nickname'],
                },
            })

            logger.error('[Service] profile ::: setNickname ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] profile ::: setNickname ::: ' + e)

            return 500
        }
    },
    setDescription : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    description: info['description'],
                },
            })

            logger.error('[Service] profile ::: setDescription ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] profile ::: setDescription ::: ' + e)

            return 500
        }
    },
    setImageURI : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    image_uri: info['image_uri'],
                },
            })

            logger.error('[Service] profile ::: setImageURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] profile ::: setImageURI ::: ' + e)

            return 500
        }
    },
    setGallery : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    gallery: info['gallery'],
                },
            })

            logger.error('[Service] profile ::: setImageURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] profile ::: setImageURI ::: ' + e)

            return 500
        }
    },
}
