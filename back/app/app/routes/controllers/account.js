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
 *       200:
 *         description: 관련 지갑 주소자의 정보 반환
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

/**
 * @swagger
 * "/account/edit/nickname/{wallet_id}":
 *   patch:
 *     tags: [Account, User]
 *     summary: "관련 지갑 주소자의 닉네임 수정"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: wallet_id
 *         required: true
 *         description: 지갑 주소
 *         schema:
 *           type: string
 *       - name: "nickname"
 *         description: "변경하고 싶은 닉네임"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nickname:
 *               description: "닉네임"
 *               type: string
 *               example: "test1234"
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
router.patch('/edit/nickname/:walletId', async (req, res)=>{
    const newInfo = {
        wallet_id : req.params.walletId,
        nickname : req.body.nickname,
    }

    const status = await profile_service.editProfileNickname(newInfo)

    res.status(status)
    res.send()
})

/**
 * @swagger
 * "/account/edit/description/{wallet_id}":
 *   patch:
 *     tags: [Account, User]
 *     summary: "관련 지갑 주소자의 소개글 수정"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: wallet_id
 *         required: true
 *         description: 지갑 주소
 *         schema:
 *           type: string
 *       - name: "description"
 *         description: "변경하고 싶은 소개글"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             description:
 *               description: "소개글"
 *               type: string
 *               example: "나는 NFTurtle 입니다."
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
router.patch('/edit/description/:walletId', async (req, res)=>{
    const newInfo = {
        wallet_id : req.params.walletId,
        description : req.body.description,
    }

    const status = await profile_service.editProfileDescription(newInfo)

    res.status(status)
    res.send()
})

/**
 * @swagger
 * "/account/edit/imageurl/{wallet_id}":
 *   patch:
 *     tags: [Account, User]
 *     summary: "관련 지갑 주소자의 이미지 수정"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: wallet_id
 *         required: true
 *         description: 지갑 주소
 *         schema:
 *           type: string
 *       - name: "image_url"
 *         description: "변경하고 싶은 이미지"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             image_url:
 *               description: "이미지"
 *               type: string
 *               example: "htttp://ipfs/..."
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
router.patch('/edit/imageurl/:walletId', async (req, res)=>{
    const newInfo = {
        wallet_id : req.params.walletId,
        image_url : req.body.image_url,
    }

    const status = await profile_service.editProfileImageURL(newInfo)

    res.status(status)
    res.send()
})

module.exports = router