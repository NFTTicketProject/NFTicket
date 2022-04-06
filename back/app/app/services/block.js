const service_name = 'Block'
const prisma = require("../utils/prisma")
const {logger} = require('../utils/winston')

module.exports = {
    createHash: async (info) => {
        try {
            const params = ['ticket_id', 'block_hash']
            let data = {}

            for (let param of params) {
                if (info[param]) data[param] = info[param]
                else return
            }

            const result = await prisma.Blockhash.create({
                data:{
                    ...data,
                    'ticket_id' : Number(data['ticket_id'])
                }
            })

            logger.info(`[Service] ${service_name} ::: createHash ::: ${JSON.stringify(result)}`)

            return result
        } catch (e) {
            logger.error(`[Service] ${service_name} ::: createHash ::: ${e}`)
        }
    },
    getHash: async (ticketId) => {
        try {
            const result = await prisma.Blockhash.findUnique({
                where: {
                    ticket_id: Number(ticketId)
                },
                select: {
                    ticket_id: true,
                    block_hash: true
                }
            })

            logger.info(`[Service] ${service_name} ::: getHash ::: ${JSON.stringify(result)}`)

            return result
        } catch (e) {
            logger.error(`[Service] ${service_name} ::: getHash ::: ${e}`)
        }
    },
}
