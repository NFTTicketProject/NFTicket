const sale_service = require("../../services/sale_service");
const express = require("express");
const router = express.Router();

// 판매글 조회
router.get("/:saleId", async (req, res, err) => {
  const result = await sale_service.getSale(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 스케줄 아이디 조회
router.get("/showscheduleid/:saleId", async (req, res, err) => {
  const result = await sale_service.getShowScheduleId(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매글 설명 조회
router.get("/description/:saleId", async (req, res, err) => {
  const result = await sale_service.getDescription(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 시작 시간 조회
router.get("/startedat/:saleId", async (req, res, err) => {
  const result = await sale_service.getStartedAt(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 종료 시간 조회
router.get("/endedat/:saleId", async (req, res, err) => {
  const result = await sale_service.getEndedAt(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 판매글 등록
router.post("/:saleId", async (req, res, err) => {
  const result = await sale_service.createSale(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 판매글 수정
router.patch("/edit/:saleId", async (req, res, err) => {
  const result = await sale_service.setSale(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 스케줄 아이디 변경
router.patch("/edit/showscheduleid/:saleId", async (req, res, err) => {
  const result = await sale_service.setShowScheduleId(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 판매글 설명 변경
router.patch("/edit/description/:saleId", async (req, res, err) => {
  const result = await sale_service.setDescription(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 시작 시간 변경
router.patch("/edit/startedat/:saleId", async (req, res, err) => {
  const result = await sale_service.setStartedAt(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 판매 종료 시간 변경
router.patch("/edit/endedat/:saleId", async (req, res, err) => {
  const result = await sale_service.setEndedAt(req.body);

  if (!result) res.status(404);

  res.json(result);
});

module.exports = router;
