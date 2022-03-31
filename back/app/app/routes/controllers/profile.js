const profile_service = require("../../services/profile_service")
const express = require('express')
const router = express.Router()


/**
 * @swagger
 * /profile/{wallet_id}:
 *  get:
 *    summary: "프로필 조회"
 *    description: "프로필 조회"
 *    tags: [Profile, User]
 *    parameters:
 *      - in: path
 *        name: wallet_id
 *        required: true
 *        description: 지갑 주소
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 프로필 반환
 *      "404":
 *        description: 존재하지 않는 사용자
 */
// 프로필 전체 조회
router.get('/:walletId', async (req, res, err) => {
    const result = await profile_service.getProfile(req.params.walletId);

    if (!result)
        res.status(404)

    res.json(result)
})

/**
 * @swagger
 * /profile/nickname/{wallet_id}:
 *  get:
 *    summary: "프로필 조회"
 *    description: "프로필 조회"
 *    tags: [Profile, User]
 *    parameters:
 *      - in: path
 *        name: wallet_id
 *        required: true
 *        description: 지갑 주소
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 프로필 반환
 *      "404":
 *        description: 존재하지 않는 사용자
 */
// 닉네임 조회
router.get('/nickname/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 닉네임 반환
    const result = await profile_service.getNickname(req.params.walletId)

    if (!result)
        res.status(404)

    res.json(result)
})

/**
 * @swagger
 * /profile/createdat/{wallet_id}:
 *  get:
 *    summary: "프로필 조회"
 *    description: "프로필 조회"
 *    tags: [Profile, User]
 *    parameters:
 *      - in: path
 *        name: wallet_id
 *        required: true
 *        description: 지갑 주소
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 프로필 반환
 *      "404":
 *        description: 존재하지 않는 사용자
 */
// 가입일 조회
router.get('/createdat/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 가입일 반환
    const result = await profile_service.getCreatedAt(req.params.walletId)

    if (!result)
        res.status(404)

    res.json(result)
})

/**
 * @swagger
 * /profile/description/{wallet_id}:
 *  get:
 *    summary: "프로필 조회"
 *    description: "프로필 조회"
 *    tags: [Profile, User]
 *    parameters:
 *      - in: path
 *        name: wallet_id
 *        required: true
 *        description: 지갑 주소
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 프로필 반환
 *      "404":
 *        description: 존재하지 않는 사용자
 */
// 자기소개 조회
router.get('/description/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 자기소개 반환
    const result = await profile_service.getDescription(req.params.walletId)

    if (!result)
        res.status(404)

    res.json(result)
})

/**
 * @swagger
 * /profile/imageuri/{wallet_id}:
 *  get:
 *    summary: "프로필 조회"
 *    description: "프로필 조회"
 *    tags: [Profile, User]
 *    parameters:
 *      - in: path
 *        name: wallet_id
 *        required: true
 *        description: 지갑 주소
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 프로필 반환
 *      "404":
 *        description: 존재하지 않는 사용자
 */
// 사용자 이미지 조회
router.get('/imageuri/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 자기소개 반환
    const result = await profile_service.getImageURI(req.params.walletId)

    if (!result)
        res.status(404)

    res.json(result)
})

/**
 * @swagger
 * /profile/gallery/{wallet_id}:
 *  get:
 *    summary: "갤러리 사이즈 조회"
 *    description: "갤러리 사이즈 조회"
 *    tags: [Profile, User]
 *    parameters:
 *      - in: path
 *        name: wallet_id
 *        required: true
 *        description: 지갑 주소
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 갤러리 사이즈 반환
 *        schema:
 *          type: object
 *          properties:
 *            gallery:
 *              description: "갤러리 사이즈"
 *              type: string
 *              example: "galleryS"
 *      "404":
 *        description: 존재하지 않는 사용자
 */
// 사용자 갤러리 사이즈 조회
router.get('/gallery/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 갤러리 사이즈 반환
    const result = await profile_service.getGallery(req.params.walletId)

    if (!result)
        res.status(404)

    res.json(result)
})

module.exports = router
