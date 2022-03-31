const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    createStaff : async (info) =>{
        await prisma.Staff.create({
            data: info,
        })

        logger.info('[Service] staff ::: createStaff ::: ' + JSON.stringify(info))
    },
    setStaff : async (info) =>{
        try {
            const params = ['name', 'image_uri']
            let data = {}

            for (var param of params)
            {
                if (info[param]) data[param] = info[param]
            }

            await prisma.staff.update({
                where: {
                    staff_id: info['staff_id'],
                },
                data
            })

            logger.error('[Service] staff ::: setStaff ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] staff ::: setStaff ::: ' + e)

            return 500
        }
    },
    setName : async (info) =>{
        try {
            await prisma.Staff.update({
                where: {
                    staff_id: info['staff_id'],
                },
                data: {
                    name: info['name'],
                },
            })

            logger.error('[Service] staff ::: setDescription ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] staff ::: setDescription ::: ' + e)

            return 500
        }
    },
    setImageURI : async (info) =>{
        try {
            await prisma.Staff.update({
                where: {
                    staff_id: info['staff_id'],
                },
                data: {
                    imageURL: info['image_uri'],
                },
            })

            logger.error('[Service] staff ::: setImageURL ::: ' + JSON.stringify(info))

            return 200
        } catch (e) {
            logger.error('[Service] staff ::: setImageURL ::: ' + e)

            return 500
        }
    },
    getStaff : async (staffId) =>{
        const result = await prisma.Staff.findUnique({
            where: {
                staff_id: Number(staffId)
            },
            select: {
                staff_id: true,
                name: true,
                imageURL: true
            },
        })

        result.forEach(el => {
            logger.info('[Service] staff ::: getStaff ::: ' + JSON.stringify(el))
        });

        return result
    },
    getName : async (staffId) =>{
        const result = await prisma.Staff.findUnique({
            where: {
                staff_id: Number(staffId)
            },
            select: {
                name: true,
            },
        })

        result.forEach(el => {
            logger.info('[Service] staff ::: getName ::: ' + JSON.stringify(el))
        });

        return result
    },
    getImageURI : async (staffId) =>{
        const result = await prisma.Staff.findUnique({
            where: {
                staff_id: Number(staffId)
            },
            select: {
                imageURL: true,
            },
        })

        result.forEach(el => {
            logger.info('[Service] staff ::: getImageURI ::: ' + JSON.stringify(el))
        });

        return result
    },
    // getImageURIByStaffId : async (staffId) =>{
    //     const result = await prisma.Ticket_images.findMany({
    //         where: {
    //             staff_id: Number(staffId)
    //         },
    //         select: {
    //             uri: true,
    //         },
    //     })

    //     result.forEach(el => {
    //         logger.info('[Service] staff ::: getImageURIByStaffId ::: ' + JSON.stringify(el))
    //     });

    //     return result
    // },
}