const prisma = require("../utils/prisma")

module.exports = {
    getProfile: async function (walletId) {
        const result = await prisma.Profile.findUnique({
            where: {
                wallet_id: walletId,
            },
        })

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

        return result
    },
    createProfile : async (info) =>{
        await prisma.Profile.create({
            data : info,
        })
    },
    editProfileNickname : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    nickname: info['nickname'],
                },
            })
            return 200
        } catch (e) {
            return 500
        }
    },
    editProfileDescription : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    description: info['description'],
                },
            })
            return 200
        } catch (e) {
            return 500
        }
    },
    editProfileImageURL : async (info) =>{
        try {
            await prisma.Profile.update({
                where: {
                    wallet_id: info['wallet_id'],
                },
                data: {
                    image_url: info['image_url'],
                },
            })
            return 200
        } catch (e) {
            return 500
        }
    },
}
