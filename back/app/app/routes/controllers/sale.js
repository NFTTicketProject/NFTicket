const sale = require("../../services/sale");
const express = require("express");
const router = express.Router();

// 판매글 등록
router.post("/", async (req, res, err) => {
    const result = await sale.createSale(req.body);
  
    if (!result) res.status(404);
  
    res.json(result);
  });

// 판매글 조회
router.get("/:saleId", async (req, res, err) => {
  const result = await sale.getSale(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 스케줄 아이디 조회
router.get("/:saleId/show-schedule-id", async (req, res, err) => {
  const result = await sale.getShowScheduleId(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매글 설명 조회
router.get("/:saleId/description", async (req, res, err) => {
  const result = await sale.getDescription(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 시작 시간 조회
router.get("/:saleId/started-at", async (req, res, err) => {
  const result = await sale.getStartedAt(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 종료 시간 조회
router.get("/:saleId/ended-at", async (req, res, err) => {
  const result = await sale.getEndedAt(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매글 수정
router.patch("/:saleId", async (req, res, err) => {
  const result = await sale.setSale(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 스케줄 아이디 변경
router.patch("/:saleId/show-schedule-id", async (req, res, err) => {
  const result = await sale.setShowScheduleId(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 판매글 설명 변경
router.patch("/:saleId/description", async (req, res, err) => {
  const result = await sale.setDescription(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 시작 시간 변경
router.patch("/:saleId/started-at", async (req, res, err) => {
  const result = await sale.setStartedAt(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 종료 시간 변경
router.patch("/:saleId/endedat", async (req, res, err) => {
  const result = await sale.setEndedAt(req.body);

  if (!result) res.status(404);

  res.json(result);
});

module.exports = router;
