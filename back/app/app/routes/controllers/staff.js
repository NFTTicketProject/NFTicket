const controller_name = "Staff"
const staff = require("../../services/staff")
const express = require("express")
const { logger } = require("../../utils/winston")
const router = express.Router()

// Todo: 서비스 등록 & 호출
// 스태프 등록
router.post("/", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    if (Object.keys(req.body).length == 0)
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    status_code = await staff.createStaff(req.body)
    result = {}
  } catch (e)
  {
    logger.error(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) } ::: ${ e }`
    )
  } finally
  {
    logger.info(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) }`
    )
    res.status(status_code)
    res.json(result)
  }
})

// 스태프 조회
router.get("/:staff_id", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await staff.getStaff(req.params.staff_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = 200
  } catch (e)
  {
    logger.error(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) } ::: ${ e }`
    )
  } finally
  {
    logger.info(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) }`
    )
    res.status(status_code)
    res.json(result)
  }
})

// 스태프 이름 조회
router.get("/:staff_id/name", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await staff.getName(req.params.staff_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = 200
  } catch (e)
  {
    logger.error(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) } ::: ${ e }`
    )
  } finally
  {
    logger.info(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) }`
    )
    res.status(status_code)
    res.json(result)
  }
})

// 스태프 사진 조회
router.get("/:staff_id/image-uri", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await staff.getImageURI(req.params.staff_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = 200
  } catch (e)
  {
    logger.error(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) } ::: ${ e }`
    )
  } finally
  {
    logger.info(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) }`
    )
    res.status(status_code)
    res.json(result)
  }
})

// 스태프 이름 수정
router.patch("/:staff_id/name", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    if (Object.keys(req.body).length == 0)
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    result = await staff.getStaff(req.params.staff_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await staff.setName(req.body)
    result = {}
  } catch (e)
  {
    logger.error(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) } ::: ${ e }`
    )
  } finally
  {
    logger.info(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) }`
    )
    res.status(status_code)
    res.json(result)
  }
})

// 스태프 사진 변경
router.patch("/:staff_id/image-uri", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    if (Object.keys(req.body).length == 0)
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    result = await staff.getStaff(req.params.staff_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await staff.setImageURI(req.body)
    result = {}
  } catch (e)
  {
    logger.error(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) } ::: ${ e }`
    )
  } finally
  {
    logger.info(
      `[Controller] ${ controller_name } ::: ${ req.method } ${ req.path } ::: ${ JSON.stringify(result) }`
    )
    res.status(status_code)
    res.json(result)
  }
})

module.exports = router
