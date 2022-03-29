const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    getProfile: async function (walletId) {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
        })

        logger.info('[profile_service.js] getProfile ::: ' + JSON.stringify(result))

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

        logger.info('[profile_service.js] getNickname ::: ' + JSON.stringify(result))

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

        logger.info('[profile_service.js] getCreatedAt ::: ' + JSON.stringify(result))

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

        logger.info('[profile_service.js] getDescription ::: ' + JSON.stringify(result))

        return result
    },
    getImageURL : async (walletId) =>{
        const result = await prisma.Profile.findFirst({
            where: {
                wallet_id: walletId,
            },
            select: {
                image_url: true,
            },
        })

        logger.info('[profile_service.js] getImageURL ::: ' + JSON.stringify(result))

        return result
    },
    createProfile : async (info) =>{
        await prisma.Profile.create({
            data : info,
        })

        logger.info('[profile_service.js] createProfile ::: ' + JSON.stringify(info))
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
                    image_url: info['image_url'],
                },
            })

            logger.error('[profile_service.js] setProfile ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[profile_service.js] setProfile ::: ' + e)

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

            logger.error('[profile_service.js] setNickname ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[profile_service.js] setNickname ::: ' + e)

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

            logger.error('[profile_service.js] setDescription ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[profile_service.js] setDescription ::: ' + e)

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
                    image_url: info['image_url'],
                },
            })

            logger.error('[profile_service.js] setImageURI ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[profile_service.js] setImageURI ::: ' + e)

            return 500
        }
    },
}
