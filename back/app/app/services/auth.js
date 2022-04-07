const service_name = 'Auth'
const eth = require('ethers')
const { logger } = require('../utils/winston')

module.exports = {
    ownerCheck: async (param, verkey) =>
    {
        if (!param.info.timestamp)
        {
            logger.info(`[Service] ${ service_name } ::: param.info.timestamp is not exist`)
            return {
                success: false,
                message: 'param.info.timestamp is not exist',
            }
        }

        if (Math.abs(new Date(param.info.timestamp) - new Date()) > 300000)
        {
            logger.info(`[Service] ${ service_name } ::: time synchronization needed`)
            return {
                success: false,
                message: 'time synchronization needed',
            }
        }

        const result = verkey === eth.utils.verifyMessage(JSON.stringify(param.info), param.hash_sign)

        return {
            success: result,
            message: `signature is ${ result ? 'valid' : 'invalid' }`,
        }
    },
}
