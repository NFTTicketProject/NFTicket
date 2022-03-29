const staff_service = require("../../services/staff_service");
const express = require("express");
const router = express.Router();

// Todo: 서비스 등록 & 호출

// 스태프 조회
router.get("/:staffId", async (req, res, err) => {
  const result = await staff_service.getStaff(req.params.staffId);

  if (!result) res.status(404);

  res.json(result);
});

// 스태프 이름 조회
router.get("/name/:staffId", async (req, res, err) => {
  const result = await staff_service.getName(req.params.staffId);

  if (!result) res.status(404);

  res.json(result);
});

// 스태프 사진 조회
router.get("/photo/:staffId", async (req, res, err) => {
  const result = await staff_service.getImageURI(req.params.staffId);

  if (!result) res.status(404);

  res.json(result);
});

// 스태프 등록
router.post("/:staffId", async (req, res, err) => {
  const result = await staff_service.createStaff(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 스태프 이름 수정
router.patch("/edit/name/:staffId", async (req, res, err) => {
  const result = await staff_service.setName(req.body);

  if (!result) res.status(404);

  res.json(result);
});

// 스태프 사진 변경
router.patch("/edit/photo/:staffId", async (req, res, err) => {
  const result = await staff_service.setImageURI(req.body);

  if (!result) res.status(404);

  res.json(result);
});

module.exports = router;
