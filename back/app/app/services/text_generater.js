const prisma = require("../utils/prisma")
const { logger } = require('../utils/winston')

module.exports={
    getRandomNickname : async () => {
        try {
            const adjective = await prisma.$queryRaw`SELECT adjective FROM RandomAdjective order by rand() limit 1`
            const noun = await prisma.$queryRaw`SELECT noun FROM RandomNoun order by rand() limit 1`

            logger.error('[Service] text_generater ::: getRandomNickname ::: ' + `${adjective[0].adjective} ${noun[0].noun}`)

            return `${adjective[0].adjective} ${noun[0].noun}`
        }catch (e) {
            logger.error('[Service] text_generater ::: getRandomNickname ::: ' + e)

            return '닉네임생성실패'
        }
    },
}
