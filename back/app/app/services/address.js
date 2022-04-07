const service_name = 'Address'
const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports = {
    isAddressExist: async (address) => {
        try
        {
            const result = await prisma.Address.findUnique({
                where: { address }
            })
    
            logger.info(`[Service] ${ service_name } ::: isAddressExist ::: ${ result }`)

            return result
        } catch (e)
        {
            logger.error(`[Service] ${ service_name } ::: isAddressExist ::: ${ e }`)
        }

    }
}