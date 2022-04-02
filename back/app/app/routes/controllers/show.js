const controller_name = "Show"
const show = require("../../services/show")
const express = require("express")
const { logger } = require("../../utils/winston")
const router = express.Router()

// 공연 등록
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

    result = await show.createShow(req.body)
    if (!result)
    {
      status_code = 400
      result = { message: "Invalid request" }
      return
    }

    status_code = 201
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

// 공연 조회
router.get("/:show_id", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    if (req.params.show_id == "search") result = await show.search(req.query)
    else if (req.params.show_id == "categories")
      result = await show.getCategoryNames()
    else
    {
      result = await show.getShow(req.params.show_id, req.query)
      if (!result)
      {
        status_code = 404
        result = { message: `${ controller_name } doesn't exist` }
        return
      }
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

// 카테고리명 조회
router.get("/:show_id/category-name", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getCategoryName(req.params.show_id)
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

// 공연명 조회
router.get("/:show_id/name", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getName(req.params.show_id)
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

// 공연 설명 조회
router.get("/:show_id/description", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getDescription(req.params.show_id)
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

// 공연 시간 조회
router.get("/:show_id/running-time", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getRunningTime(req.params.show_id)
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

// 공연 시청연령 조회
router.get("/:show_id/age-limit", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getAgeLimit(req.params.show_id)
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

// 공연 포스터 URI 조회
router.get("/:show_id/poster-uri", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getPosterURI(req.params.show_id)
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

// 공연 예고편 URI 조회
router.get("/:show_id/video-uri", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getVideoURI(req.params.show_id)
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

// 공연 기본 티켓 이미지 주소 조회
router.get("/:show_id/default-ticket-image-uri", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getDefaultTicketImageURI(req.params.show_id)
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

// 공연 수정
router.patch("/:show_id", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setShow(req.params.show_id, req.body)
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

// 카테고리명 수정
router.patch("/:show_id/category-name", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setCategoryName(req.params.show_id, req.body)
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

// 공연명 수정
router.patch("/:show_id/name", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setName(req.params.show_id, req.body)
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

// 공연설명 수정
router.patch("/:show_id/description", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setDescription(req.params.show_id, req.body)
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

// 러닝타임 수정
router.patch("/:show_id/running-time", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setRunningTime(req.params.show_id, req.body)
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

// 나이제한 수정
router.patch("/:show_id/age-limit", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setAgeLimit(req.params.show_id, req.body)
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

// 공연 포스터 수정
router.patch("/:show_id/poster-uri", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setPosterURI(req.params.show_id, req.body)
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

// 공연 홍보 동영상 수정
router.patch("/:show_id/video-uri", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setVideoURI(req.params.show_id, req.body)
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

// 기본 티켓 이미지 수정
router.patch("/:show_id/default-ticket-image-uri", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await show.setDefaultTicketImageURI(
      req.params.show_id,
      req.body
    )
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

// 공연 스케줄 Contract 주소 추가
router.put("/:show_id/show-schedule", async (req, res, err) =>
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

    result = await show.getShow(req.params.show_id)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    result = await show.addShowScheduleAddress(
      req.params.show_id,
      req.body
    )
    status_code = 201
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

// 공연 스케줄 Contract 주소 추가
router.get("/:show_id/show-schedule", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getShowScheduleAddress(req.params.show_id, req.query)
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

// 공연 스케줄 Contract 주소 추가
router.get("/:show_id/role", async (req, res, err) =>
{
  let status_code = 500
  let result

  try
  {
    result = await show.getRole(req.params.show_id)
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

module.exports = router
