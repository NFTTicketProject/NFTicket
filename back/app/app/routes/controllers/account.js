const profile_service = require("../../services/profile_service")
const auth = require('../../services/auth_service')
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
router.post('/:walletId', async (req, res) => {
    const result = await profile_service.getProfile(req.params.walletId)

    if (result)
        res.send(result)
    else {
        const newInfo = {
            wallet_id: req.params.walletId,
            nickname: req.params.walletId,
            description: `${req.params.walletId}Description`,
            image_url: 'none'
        }

        await profile_service.createProfile(newInfo)

        res.send(await profile_service.getProfile(req.params.walletId))
    }
})

/**
 * @swagger
 * /account/edit/{wallet_id}:
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
 *         example : "0xC1b9c91D0416a04162cb96029626aDE4ccC15818"
 *       - name: "info"
 *         description: "변경하고 싶은 닉네임"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               schema:
 *                 type: object
 *                 properties:
 *                   nickname:
 *                     description: "닉네임"
 *                     type: string
 *                     example: test1234
 *                   description:
 *                     description: "소개글"
 *                     type: string
 *                     example: 나는 NFTurtle 입니다.
 *                   image_url:
 *                     description: "이미지"
 *                     type: string
 *                     example: http://ipfs/...
 *                   timestamp:
 *                     description: "타임스탬프"
 *                     type: int
 *                     example: 1648433785800
 *               example: {nickname : test1234, description : 나는 NFTurtle 입니다., image_url : http://ipfs/..., timestamp : 1648433785800}
 *             hash_sign:
 *               description: "sha256 서명"
 *               type: string
 *               example: "0xb075e20f0ab0b27d30cd238bcbd54e0936daee9381f7d9ce562404a2b1c3d69d483e997ded8aee17d12d54da3472c4c35dcdaa9139c52ab785f34a9f585fd6ba1c"
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
router.patch('/edit/:walletId', async (req, res) => {
    const newInfo = {
        wallet_id: req.params.walletId,
        nickname: req.body.info.nickname,
        description: req.body.info.description,
        image_url: req.body.info.image_url,
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile_service.setProfile(newInfo)

    res.status(status)
    res.send()
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
 *         example : "0xC1b9c91D0416a04162cb96029626aDE4ccC15818"
 *       - name: "info"
 *         description: "변경하고 싶은 닉네임"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               schema:
 *                 type: object
 *                 properties:
 *                   nickname:
 *                     description: "닉네임"
 *                     type: string
 *                     example: test1234
 *                   timestamp:
 *                     description: "타임스탬프"
 *                     type: int
 *                     example: 1648433785800
 *               example: {nickname : test1234, timestamp : 1648433785800}
 *             hash_sign:
 *               description: "sha256 서명"
 *               type: string
 *               example: "0xb075e20f0ab0b27d30cd238bcbd54e0936daee9381f7d9ce562404a2b1c3d69d483e997ded8aee17d12d54da3472c4c35dcdaa9139c52ab785f34a9f585fd6ba1c"
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
router.patch('/edit/nickname/:walletId', async (req, res) => {
    const newInfo = {
        wallet_id: req.params.walletId,
        nickname: req.body.info.nickname,
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile_service.setNickname(newInfo)

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
 *         example : "0xC1b9c91D0416a04162cb96029626aDE4ccC15818"
 *       - name: "info"
 *         description: "변경하고 싶은 소개글"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               schema:
 *                 type: object
 *                 properties:
 *                   description:
 *                     description: "소개글"
 *                     type: string
 *                     example: 나는 NFTurtle 입니다.
 *                   timestamp:
 *                     description: "타임스탬프"
 *                     type: int
 *                     example: 1648433785800
 *               example: {description : 나는 NFTurtle 입니다., timestamp : 1648433785800}
 *             hash_sign:
 *               description: "sha256 서명"
 *               type: string
 *               example: "0xb075e20f0ab0b27d30cd238bcbd54e0936daee9381f7d9ce562404a2b1c3d69d483e997ded8aee17d12d54da3472c4c35dcdaa9139c52ab785f34a9f585fd6ba1c"
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
router.patch('/edit/description/:walletId', async (req, res) => {
    const newInfo = {
        wallet_id: req.params.walletId,
        description: req.body.info.description,
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile_service.setDescription(newInfo)

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
 *         example : "0xC1b9c91D0416a04162cb96029626aDE4ccC15818"
 *       - name: "info"
 *         description: "변경하고 싶은 이미지"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               schema:
 *                 type: object
 *                 properties:
 *                   image_url:
 *                     description: "이미지"
 *                     type: string
 *                     example: http://ipfs/...
 *                   timestamp:
 *                     description: "타임스탬프"
 *                     type: int
 *                     example: 1648433785800
 *               example: {image_url : http://ipfs/..., timestamp : 1648433785800}
 *             hash_sign:
 *               description: "sha256 서명"
 *               type: string
 *               example: "0xb075e20f0ab0b27d30cd238bcbd54e0936daee9381f7d9ce562404a2b1c3d69d483e997ded8aee17d12d54da3472c4c35dcdaa9139c52ab785f34a9f585fd6ba1c"
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
router.patch('/edit/imageurl/:walletId', async (req, res) => {
    const newInfo = {
        wallet_id: req.params.walletId,
        image_url: req.body.info.image_url,
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile_service.setImageURI(newInfo)

    res.status(status)
    res.send()
})

module.exports = router
