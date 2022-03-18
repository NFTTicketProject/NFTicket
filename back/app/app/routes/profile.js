const prisma = require("../utils/prisma")
const express = require('express')
const router = express.Router()

// 프로필 전체 조회
router.get('/:walletId', async (req, res, err) => {
    const result = await prisma.Profile.findMany();
    console.log(result)
    // walletID 와 일치하는 Row 반환
    res.json({
        nickname: "user1",
        createAt: 1234567890,
        description: "영차영차",
    })
})

// 닉네임 조회
router.get('/:walletId', (req, res, err) => {
    // walletID 와 일치하는 닉네임 반환
    res.json({
        nickname: "user1",
    })
})

// 가입일 조회
router.get('/:walletId', (req, res, err) => {
    // walletID 와 일치하는 가입일 반환
    res.json({
        createAt: 1234567890,
    })
})

// 자기소개 조회
router.get('/:walletId', (req, res, err) => {
    // walletID 와 일치하는 자기소개 반환
    res.json({
        description: "영차영차",
    })
})

module.exports = router
