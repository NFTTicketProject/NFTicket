const show_service = require("../../services/show_service");
const express = require("express");
const router = express.Router();

// 공연 검색
router.get("/search", async (req, res, err) => {
  const result = await show_service.search(req.query);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 카테고리 목록
router.get("/categories", async (req, res, err) => {
  const result = await show_service.getCategoryNames();

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/":
 *   post:
 *     tags: [Show]
 *     summary: "공연 등록"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - name: "show_info"
 *         description: "공연 정보"
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             category_name:
 *               type: string
 *               example : '카테고리'
 *             name:
 *               type: string
 *               example : '공연명'
 *             description:
 *               type: string
 *               example : "공연설명 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
 *             running_time:
 *               type: int
 *               example : 120
 *             age_limit:
 *               type: int
 *               example : 19
 *             poster_uri:
 *               type: string
 *               example : 'http://poster...'
 *             video_uri:
 *               type: string
 *               example : 'http://video...'
 *             default_ticket_image_uri:
 *               type: string
 *               example : 'http://image...'
 *     responses:
 *       200:
 *         description: "성공"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 공연 등록
router.post("/", async (req, res, err) => {
  const result = await show_service.createShow(req.body);

  if (!result) res.status(404);

  res.json();
});

/**
 * @swagger
 * "/show/{showId}":
 *   get:
 *     tags: [Show]
 *     summary: "공연 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             category_name:
 *                   description: "카테고리"
 *                   type: string
 *                   example: "카테고리"
 *             name:
 *                   description: "공연명"
 *                   type: string
 *                   example: "공연명"
 *             description:
 *                   description: "공연설명"
 *                   type: string
 *                   example: "공연설명"
 *             running_time:
 *                   description: "공연시간"
 *                   type: int
 *                   example: 120
 *             age_limit:
 *                   description: "공연 시청연령"
 *                   type: int
 *                   example: 12
 *             video_uri:
 *                   description: "공연 포스터 URI"
 *                   type: string
 *                   example: "http://..."
 *             poster_uri:
 *                   description: "공연 예고편 URI"
 *                   type: string
 *                   example: "http://..."
 *             default_ticket_image_uri:
 *                   description: "공연 기본 티켓 이미지 주소"
 *                   type: string
 *                   example: "http://..."
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */

// 공연 조회
router.get("/:showId", async (req, res, err) => {
  const result = await show_service.getShow(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/category-name":
 *   get:
 *     tags: [Show]
 *     summary: "카테고리 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             category_name:
 *                   description: "카테고리"
 *                   type: string
 *                   example: "카테고리"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 카테고리명 조회
router.get("/:showId/category-name", async (req, res, err) => {
  const result = await show_service.getCategoryName(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/name":
 *   get:
 *     tags: [Show]
 *     summary: "공연명 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *                   description: "공연명"
 *                   type: string
 *                   example: "공연명"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 공연명 조회
router.get("/:showId/name", async (req, res, err) => {
  const result = await show_service.getName(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/description":
 *   get:
 *     tags: [Show]
 *     summary: "공연 설명 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             description:
 *                   description: "공연 설명"
 *                   type: string
 *                   example: "공연 설명"
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 공연 설명 조회
router.get("/:showId/description", async (req, res, err) => {
  const result = await show_service.getDescription(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/running-time":
 *   get:
 *     tags: [Show]
 *     summary: "공연 시간 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             running_time:
 *                   description: "공연 시간"
 *                   type: int
 *                   example: 120
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 공연 시간 조회
router.get("/:showId/running-time", async (req, res, err) => {
  const result = await show_service.getRunningTime(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/age-limit":
 *   get:
 *     tags: [Show]
 *     summary: "공연 시청연령 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             age_limit:
 *                   description: "공연 시청연령"
 *                   type: int
 *                   example: 120
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 공연 시청연령 조회
router.get("/:showId/age-limit", async (req, res, err) => {
  const result = await show_service.getAgeLimit(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/poster-uri":
 *   get:
 *     tags: [Show]
 *     summary: "공연 포스터 URI 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             poster_uri:
 *                   description: "공연 포스터 URI"
 *                   type: string
 *                   example: 'http://...'
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 공연 포스터 URI 조회
router.get("/:showId/poster-uri", async (req, res, err) => {
  const result = await show_service.getPosterURI(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/video-uri":
 *   get:
 *     tags: [Show]
 *     summary: "공연 비디오 URI 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             video_uri:
 *                   description: "공연 비디오 URI"
 *                   type: string
 *                   example: 'http://...'
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
// 공연 예고편 URI 조회
router.get("/:showId/video-uri", async (req, res, err) => {
  const result = await show_service.getVideoURI(req.params.showId);

  if (!result) res.status(404);

  res.json(result);
});

/**
 * @swagger
 * "/show/{showId}/default-ticket-image-uri":
 *   get:
 *     tags: [Show]
 *     summary: "공연 기본 티켓 이미지 주소 조회"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         description: 공연 아이디
 *         schema:
 *           type: int
 *         example : 123
 *     responses:
 *       200:
 *         description: "성공"
 *         schema:
 *           type: object
 *           properties:
 *             default_ticket_image_uri:
 *                   description: "공연 기본 티켓 이미지 주소"
 *                   type: string
 *                   example: 'http://...'
 *       500:
 *         description: "사용자 없음 | 서버 오류"
 */
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
