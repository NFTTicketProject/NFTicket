const controller_name = "Sale"
const sale = require("../../services/sale")
const express = require("express")
const { logger } = require("../../utils/winston")
const router = express.Router()

// 판매글 등록
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

    status_code = await sale.createSale(req.body)
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

// 판매글 조회
router.get("/:sale_id", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await sale.getSale(req.params.sale_id)
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

// 공연 스케줄 아이디 조회
router.get("/:sale_id/show-schedule-id", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await sale.getShowScheduleId(req.params.sale_id)
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

// 판매글 설명 조회
router.get("/:sale_id/description", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await sale.getDescription(req.params.sale_id)
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

// 판매 시작 시간 조회
router.get("/:sale_id/started-at", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await sale.getStartedAt(req.params.sale_id)
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

// 판매 종료 시간 조회
router.get("/:sale_id/ended-at", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await sale.getEndedAt(req.params.sale_id)
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

// 판매글 수정
router.patch("/:sale_id", async (req, res, err) =>
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

    result = await sale.getSale(req.params.sale_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await sale.setSale(req.body)
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

// 공연 스케줄 아이디 변경
router.patch("/:sale_id/show-schedule-id", async (req, res, err) =>
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

    result = await sale.getSale(req.params.sale_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await sale.setShowScheduleId(req.body)
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

// 판매글 설명 변경
router.patch("/:sale_id/description", async (req, res, err) =>
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

    result = await sale.getSale(req.params.sale_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await sale.setDescription(req.body)
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

// 판매 시작 시간 변경
router.patch("/:sale_id/started-at", async (req, res, err) =>
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

    result = await sale.getSale(req.params.sale_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await sale.setStartedAt(req.body)
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

// 판매 종료 시간 변경
router.patch("/:sale_id/ended-at", async (req, res, err) =>
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

    result = await sale.getSale(req.params.sale_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await sale.setEndedAt(req.body)
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
