const role_service = require("../../services/role_service");
const express = require("express");
const router = express.Router();

// 역할 등록
router.post("/", async (req, res, err) => {
  const result = await role_service.createRole(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 역할 조회
router.get("/:saleId", async (req, res, err) => {
  const result = await role_service.getRole(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 역할명 조회
router.get("/:saleId/occupation", async (req, res, err) => {
  const result = await role_service.getOccupation(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 스태프아이디 조회
router.get("/:saleId/staff-id", async (req, res, err) => {
  const result = await role_service.getStaffId(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 공연아이디 조회
router.get("/:saleId/show-id", async (req, res, err) => {
  const result = await role_service.getShowId(req.params.saleId);

  if (!result) res.status(404);

  res.json(result);
});

// 역할 수정
router.patch("/:saleId", async (req, res, err) => {
  const result = await role_service.setRole(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 역할명 수정
router.patch("/:saleId/occupation", async (req, res, err) => {
  const result = await role_service.setOccupation(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 스태프 아이디 수정
router.patch("/:saleId/staff-id", async (req, res, err) => {
  const result = await role_service.setStaffId(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 공연 아이디 수정
router.patch("/:saleId/show-id", async (req, res, err) => {
  const result = await role_service.setShowId(req.body);

  if (!result) res.status(404);

  res.json(result);
});

module.exports = router;
