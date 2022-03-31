const profile = require("../../services/profile")
const text_generater = require('../../services/text_generater')
const auth = require('../../services/auth')
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
 *         schema:
 *           type: object
 *           properties:
 *             wallet_id:
 *                   description: "지갑주소"
 *                   type: string
 *                   example: '0xC1b9c81D0416a04162cb96029726aDE4ccC15819'
 *             nickname:
 *                   description: "닉네임"
 *                   type: string
 *                   example: '닉네임'
 *             description:
 *                   description: "자기소개"
 *                   type: string
 *                   example: '자기소개'
 *             created_at:
 *                   description: "생성시간"
 *                   type: string
 *                   example: '2022-03-30T17:24:14.000Z'
 *             image_uri:
 *                   description: "프로필 사진"
 *                   type: string
 *                   example: 'http://ipfs/...'
 *             gallery:
 *                   description: "갤러리 사이즈"
 *                   type: string
 *                   example: 'galleryS'
 */
router.post('/:walletId', async (req, res) => {
    const result = await profile.getProfile(req.params.walletId)

    if (result)
        res.send(result)
    else {
        const newInfo = {
            wallet_id: req.params.walletId,
            nickname: await text_generater.getRandomNickname(),
            description: '티켓 공연 좋아합니다',
            image_uri: 'none',
            gallery: 'galleryS',
        }

        await profile.createProfile(newInfo)

        res.send(await profile.getProfile(req.params.walletId))
    }
})

/**
 * @swagger
 * /account/edit/{wallet_id}:
 *   patch:
 *     tags: [Account, User]
 *     summary: "관련 지갑 주소자의 프로필 수정"
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
 *         description: "변경하고 싶은 프로필"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               properties:
 *                 nickname:
 *                   description: "닉네임"
 *                   type: string
 *                   example: test1234
 *                 description:
 *                   description: "소개글"
 *                   type: string
 *                   example: 나는 NFTurtle 입니다.
 *                 image_uri:
 *                   description: "이미지"
 *                   type: string
 *                   example: http://ipfs/...
 *                 timestamp:
 *                   description: "타임스탬프"
 *                   type: int
 *                   example: 1648433785800
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
        image_uri: req.body.info.image_uri,
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile.setProfile(newInfo)

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
 *         description: "변경하고 싶은 프로필"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               properties:
 *                 nickname:
 *                   description: "닉네임"
 *                   type: string
 *                   example: test1234
 *                 timestamp:
 *                   description: "타임스탬프"
 *                   type: int
 *                   example: 1648433785800
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
        nickname: req.body.info.nickname.slice(0, 10),
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile.setNickname(newInfo)

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
 *         description: "변경하고 싶은 프로필"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               properties:
 *                 description:
 *                   description: "소개글"
 *                   type: string
 *                   example: 나는 NFTurtle 입니다.
 *                 timestamp:
 *                   description: "타임스탬프"
 *                   type: int
 *                   example: 1648433785800
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

    const status = await profile.setDescription(newInfo)

    res.status(status)
    res.send()
})

/**
 * @swagger
 * "/account/edit/imageuri/{wallet_id}":
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
 *         description: "변경하고 싶은 프로필"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               properties:
 *                 image_uri:
 *                   description: "이미지"
 *                   type: string
 *                   example: http://ipfs/...
 *                 timestamp:
 *                   description: "타임스탬프"
 *                   type: int
 *                   example: 1648433785800
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
router.patch('/edit/imageuri/:walletId', async (req, res) => {
    const newInfo = {
        wallet_id: req.params.walletId,
        image_uri: req.body.info.image_uri,
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile.setImageURI(newInfo)

    res.status(status)
    res.send()
})

/**
 * @swagger
 * "/account/edit/gallery/{wallet_id}":
 *   patch:
 *     tags: [Account, User]
 *     summary: "관련 지갑 주소자의 갤러리 사이즈 수정"
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
 *         description: "변경하고 싶은 갤러리 사이즈"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             info:
 *               description: "수정 정보"
 *               type: object
 *               properties:
 *                 gallery:
 *                   description: "갤러리 사이즈"
 *                   type: string
 *                   example: 'galleryS'
 *                 timestamp:
 *                   description: "타임스탬프"
 *                   type: int
 *                   example: 1648433785800
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
router.patch('/edit/gallery/:walletId', async (req, res) => {
    const newInfo = {
        wallet_id: req.params.walletId,
        gallery: req.body.info.gallery,
    }

    const validation = await auth.ownerCheck(req.body, req.params.walletId)

    if (!validation.success) {
        res.status(500)
        res.send({message : validation.message})
        return;
    }

    const status = await profile.setGallery(newInfo)

    res.status(status)
    res.send()
})

module.exports = router
