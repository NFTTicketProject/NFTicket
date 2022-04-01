const show = require("../../services/show");
const express = require("express");
const router = express.Router();


// 공연 등록
router.post("/", async (req, res, err) => {
    const result = await show.createShow(req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});


// 공연 조회
router.get("/:showId", async (req, res, err) => {
    let result
    if (req.params.showId == 'search') result = await show.search(req.query);
    else if (req.params.showId == 'categories') result = await show.getCategoryNames();
    else result = await show.getShow(req.params.showId, req.query);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 카테고리명 조회
router.get("/:showId/category-name", async (req, res, err) => {
    const result = await show.getCategoryName(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연명 조회
router.get("/:showId/name", async (req, res, err) => {
    const result = await show.getName(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 설명 조회
router.get("/:showId/description", async (req, res, err) => {
    const result = await show.getDescription(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 시간 조회
router.get("/:showId/running-time", async (req, res, err) => {
    const result = await show.getRunningTime(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 시청연령 조회
router.get("/:showId/age-limit", async (req, res, err) => {
    const result = await show.getAgeLimit(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 포스터 URI 조회
router.get("/:showId/poster-uri", async (req, res, err) => {
    const result = await show.getPosterURI(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 예고편 URI 조회
router.get("/:showId/video-uri", async (req, res, err) => {
    const result = await show.getVideoURI(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 기본 티켓 이미지 주소 조회
router.get("/:showId/default-ticket-image-uri", async (req, res, err) => {
    const result = await show.getDefaultTicketImageURI(req.params.showId);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 수정
router.patch("/:showId", async (req, res, err) => {
    const result = await show.setShow(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 카테고리명 수정
router.patch("/:showId/category-name", async (req, res, err) => {
    const result = await show.setCategoryName(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연명 수정
router.patch("/:showId/name", async (req, res, err) => {
    const result = await show.setName(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연설명 수정
router.patch("/:showId/description", async (req, res, err) => {
    const result = await show.setDescription(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 러닝타임 수정
router.patch("/:showId/running-time", async (req, res, err) => {
    const result = await show.setRunningTime(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 나이제한 수정
router.patch("/:showId/age-limit", async (req, res, err) => {
    const result = await show.setAgeLimit(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 포스터 수정
router.patch("/:showId/poster-uri", async (req, res, err) => {
    const result = await show.setPosterURI(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 홍보 동영상 수정
router.patch("/:showId/video-uri", async (req, res, err) => {
    const result = await show.setVideoURI(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 기본 티켓 이미지 수정
router.patch("/:showId/default-ticket-image-uri", async (req, res, err) => {
    const result = await show.setDefaultTicketImageURI(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 스케줄 Contract 주소 추가
router.put("/:showId/show-schedule", async (req, res, err) => {
    const result = await show.addShowScheduleAddress(req.params.showId, req.body);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

// 공연 스케줄 Contract 주소 추가
router.get("/:showId/show-schedule", async (req, res, err) => {
    const result = await show.getShowScheduleAddress(req.params.showId, req.query);

    if (!result) res.status(404);
    if (result == 500) res.status(500);

    res.json(result);
});

module.exports = router;
