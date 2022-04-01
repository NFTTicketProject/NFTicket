const role = require("../../services/role");
const express = require("express");
const {logger} = require("../../utils/winston");
const router = express.Router();

// 역할 등록
router.post("/", async (req, res, err) => {
  let status_code = 500;
  let result;

  try {
    result = await role.createRole(req.body)
    if (!result)
    {
      status_code = 400
      result = { message: "Invalid request" }
      return
    }

    status_code = 201
  } catch (e) {
    logger.error('[Controller] role ::: POST / ::: ' + e);
  } finally {
    logger.info('[Controller] role ::: POST / ::: ' + JSON.stringify(result));
    res.status(status_code)
    res.json(result)
  }
});

// 역할 조회
router.get("/:showId/:staffId", async (req, res, err) => {
  let status_code = 500;
  let result;

  try {
    result = await role.getRole(req.params.showId, req.params.staffId);
    if (!result) {
      status_code = 404
      result = {message: "Role doesn't exist"}
      return
    }

    status_code = 200
  } catch (e) {
    logger.error('[Controller] role ::: GET /:showId/:staffId ::: ' + e);
  } finally {
    logger.info('[Controller] role ::: GET /:showId/:staffId ::: ' + JSON.stringify(result));
    res.status(status_code)
    res.json(result)
  }
});

// 역할 수정
router.patch("/:show_id/:staff_id", async (req, res, err) => {
  let status_code = 500;
  let result;

  try {
    if (Object.keys(req.body).length == 0) {
      status_code = 400
      result = {message: "Invaild request"}
      return
    }

    status_code = await role.setRole({ ...req.params, ...req.body })
    result = {}
  } catch (e) {
    logger.error('[Controller] role ::: PATCH /:showId/:staffId ::: ' + e);
  } finally {
    logger.info('[Controller] role ::: PATCH /:showId/:staffId ::: ' + JSON.stringify(result));
    res.status(status_code)
    res.json(result)
  }
});

module.exports = router;
