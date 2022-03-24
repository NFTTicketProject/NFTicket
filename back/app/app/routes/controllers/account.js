const profile_service = require("../../services/profile_service")
const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /account/{wallet_id}:
 *  post:
 *    summary: "관련 지갑 주소자의 정보를 준다"
 *    description: "관련 지갑 주소자의 정보를 준다"
 *    tags: [Account, User]
 *    parameters:
 *      - in: path
 *        name: wallet_id
 *        required: true
 *        description: 지갑 주소
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 관련 지갑 주소자의 정보 반환
 *      "404":
 *        description: 존재하지 않는 사용자
 */
router.post('/:walletId', async (req, res)=>{
    const result = await profile_service.getProfile(req.params.walletId)

    if(result)
        res.send(result)
    else{
        const newInfo = {
            wallet_id : req.params.walletId,
            nickname : req.params.walletId,
            description : `${req.params.walletId}Description`,
            image_url : 'none'
        }

        await profile_service.createProfile(newInfo)

        res.send(await profile_service.getProfile(req.params.walletId))
    }
})

module.exports = router