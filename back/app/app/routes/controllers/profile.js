const prisma = require("../../utils/prisma")
const service = require("../../services/profile_service")
const express = require('express')
const router = express.Router()

// 프로필 전체 조회
router.get('/:walletId', async (req, res, err) => {
    const result = await service.getProfile(req.params.walletId);

    res.json(result)
})

// 닉네임 조회
router.get('/nickname/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 닉네임 반환
    const result = await service.getNickname(req.params.walletId)
    res.json(result)
})

// 가입일 조회
router.get('/createdat/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 가입일 반환
    const result = await service.getCreatedAt(req.params.walletId)
    res.json(result)
})

// 자기소개 조회
router.get('/description/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 자기소개 반환
    const result = await service.getDescription(req.params.walletId)
    res.json(result)
})

// 사용자 이미지 조회
router.get('/imageurl/:walletId', async (req, res, err) => {
    // walletID 와 일치하는 자기소개 반환
    const result = await service.getImageURL(req.params.walletId)
    res.json(result)
})

module.exports = router
