const show_service = require("../../services/show_service");
const express = require("express");
const router = express.Router();

// 공연 등록
router.post("/", async (req, res, err) => {
  const result = await show_service.createShow(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 조회
router.get("/:showId", async (req, res, err) => {
  const result = await show_service.getShow(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 카테고리명 조회
router.get("/:showId/category-name", async (req, res, err) => {
  const result = await show_service.getCategoryName(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연명 조회
router.get("/:showId/name", async (req, res, err) => {
  const result = await show_service.getName(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 설명 조회
router.get("/:showId/description", async (req, res, err) => {
  const result = await show_service.getDescription(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 시간 조회
router.get("/:showId/running-time", async (req, res, err) => {
  const result = await show_service.getRunningTime(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 시청연령 조회
router.get("/:showId/age-limit", async (req, res, err) => {
  const result = await show_service.getAgeLimit(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 포스터 URI 조회
router.get("/:showId/poster-uri", async (req, res, err) => {
  const result = await show_service.getPosterURI(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 예고편 URI 조회
router.get("/:showId/video-uri", async (req, res, err) => {
  const result = await show_service.getVideoURI(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 기본 티켓 이미지 주소 조회
router.get("/:showId/default-ticket-image-uri", async (req, res, err) => {
  const result = await show_service.getDefaultTicketImageURI(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 수정
router.patch("/:showId", async (req, res, err) => {
  const result = await show_service.setShow(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 카테고리명 수정
router.patch("/:showId/category-name", async (req, res, err) => {
  const result = await show_service.setCategoryName(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연명 수정
router.patch("/:showId/name", async (req, res, err) => {
  const result = await show_service.setName(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연설명 수정
router.patch("/:showId/description", async (req, res, err) => {
  const result = await show_service.setDescription(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 러닝타임 수정
router.patch("/:showId/running-time", async (req, res, err) => {
  const result = await show_service.setRunningTime(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 나이제한 수정
router.patch("/:showId/age-limit", async (req, res, err) => {
  const result = await show_service.setAgeLimit(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 포스터 수정
router.patch("/:showId/poster-uri", async (req, res, err) => {
  const result = await show_service.setPosterURI(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 홍보 동영상 수정
router.patch("/:showId/video-uri", async (req, res, err) => {
  const result = await show_service.setVideoURI(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 기본 티켓 이미지 수정
router.patch("/:showId/default-ticket-image-uri", async (req, res, err) => {
  const result = await show_service.setDefaultTicketImageURI(req.params.showId, req.body);

  if (!result) res.status(404);

  res.json(result);
});

module.exports = router;
