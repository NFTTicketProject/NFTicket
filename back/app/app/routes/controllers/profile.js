const profile = require("../../services/profile")
const { logger } = require('../../utils/winston')
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
router.get('/:wallet_address', async (req, res) => {
    let status_code = 500;
    let result;

    try {
        result = await profile.getProfile(req.params.wallet_address);
        if (!result) {
            status_code = 404
            result = { message: "Address doesn't exist" }
            return
        }
            
        status_code = 200
    } catch (e) {
        logger.error('[Controller] profile ::: GET /:wallet_address ::: ' + e);
    } finally {
        logger.info('[Controller] profile ::: GET /:wallet_address ::: ' + JSON.stringify(result));
        res.status(status_code)
        res.json(result)
    }
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
    const result = await profile.getNickname(req.params.walletId)

    if (!result)
        res.status(404)

    res.json({...result, message: "This API will be deprecated. Find out more at our swagger docs."})
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
    const result = await profile.getCreatedAt(req.params.walletId)

    if (!result)
        res.status(404)

    res.json({...result, message: "This API will be deprecated. Find out more at our swagger docs."})
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
    const result = await profile.getDescription(req.params.walletId)

    if (!result)
        res.status(404)

    res.json({...result, message: "This API will be deprecated. Find out more at our swagger docs."})
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
    const result = await profile.getImageURI(req.params.walletId)

    if (!result)
        res.status(404)

    res.json({...result, message: "This API will be deprecated. Find out more at our swagger docs."})
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
    const result = await profile.getGallery(req.params.walletId)

    if (!result)
        res.status(404)

    res.json({...result, message: "This API will be deprecated. Find out more at our swagger docs."})
})


// 닉네임 조회
router.get('/:wallet_address/nickname', async (req, res) => {
    let status_code = 500;
    let result;

    try {
        result = await profile.getNickname(req.params.wallet_address);
        if (!result) {
            status_code = 404
            result = { message: "Address doesn't exist" }
            return
        }
            
        status_code = 200
    } catch (e) {
        logger.error('[Controller] profile ::: GET /:wallet_address/nickname ::: ' + e);
    } finally {
        logger.info('[Controller] profile ::: GET /:wallet_address/nickname ::: ' + JSON.stringify(result));
        res.status(status_code)
        res.json(result)
    }
})

// 자기소개 조회
router.get('/:wallet_address/description', async (req, res) => {
    let status_code = 500;
    let result;

    try {
        result = await profile.getDescription(req.params.wallet_address);
        if (!result) {
            status_code = 404
            result = { message: "Address doesn't exist" }
            return
        }
            
        status_code = 200
    } catch (e) {
        logger.error('[Controller] profile ::: GET /:wallet_address/description ::: ' + e);
    } finally {
        logger.info('[Controller] profile ::: GET /:wallet_address/description ::: ' + JSON.stringify(result));
        res.status(status_code)
        res.json(result)
    }
})

// 사용자 이미지 조회
router.get('/:wallet_address/image-uri', async (req, res) => {
    let status_code = 500;
    let result;

    try {
        result = await profile.getImageURI(req.params.wallet_address);
        if (!result) {
            status_code = 404
            result = { message: "Address doesn't exist" }
            return
        }
            
        status_code = 200
    } catch (e) {
        logger.error('[Controller] profile ::: GET /:wallet_address/image-uri ::: ' + e);
    } finally {
        logger.info('[Controller] profile ::: GET /:wallet_address/image-uri ::: ' + JSON.stringify(result));
        res.status(status_code)
        res.json(result)
    }
})

// 가입일 조회
router.get('/:wallet_address/created-at', async (req, res) => {
    let status_code = 500;
    let result;

    try {
        result = await profile.getCreatedAt(req.params.wallet_address);
        if (!result) {
            status_code = 404
            result = { message: "Address doesn't exist" }
            return
        }
            
        status_code = 200
    } catch (e) {
        logger.error('[Controller] profile ::: GET /:wallet_address/created-at ::: ' + e);
    } finally {
        logger.info('[Controller] profile ::: GET /:wallet_address/created-at ::: ' + JSON.stringify(result));
        res.status(status_code)
        res.json(result)
    }
})

// 사용자 갤러리 사이즈 조회
router.get('/:wallet_address/gallery', async (req, res) => {
    let status_code = 500;
    let result;

    try {
        result = await profile.getGallery(req.params.wallet_address);
        if (!result) {
            status_code = 404
            result = { message: "Address doesn't exist" }
            return
        }
            
        status_code = 200
    } catch (e) {
        logger.error('[Controller] profile ::: GET /:wallet_address/gallery ::: ' + e);
    } finally {
        logger.info('[Controller] profile ::: GET /:wallet_address/gallery ::: ' + JSON.stringify(result));
        res.status(status_code)
        res.json(result)
    }
})

module.exports = router
