const controller_name = "Account"
const profile = require("../../services/profile")
const auth = require("../../services/auth")
const { logger } = require("../../utils/winston")
const express = require("express")
const web3 = require("web3")
const router = express.Router()

router.post("/:wallet_address", async (req, res) =>
{
  let status_code = 500
  let result

  try
  {
    if (!web3.utils.isAddress(req.params.wallet_address))
    {
      status_code = 400
      result = { message: "Invalid address" }
      return
    }

    result = await profile.getProfile(req.params.wallet_address)
    if (result)
    {
      status_code = 200
      return
    } else
    {
      const newInfo = {
        wallet_id: req.params.wallet_address,
        nickname: await profile.getRandomNickname(),
        description: "티켓 공연 좋아합니다",
        image_uri: "none",
        gallery: "galleryS",
      }

      result = await profile.createProfile(newInfo)
      status_code = 201
    }
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

router.patch("/edit/:walletId", async (req, res) =>
{
  const newInfo = {
    wallet_id: req.params.walletId,
    nickname: req.body.info.nickname,
    description: req.body.info.description,
    image_uri: req.body.info.image_uri,
  }

  const validation = await auth.ownerCheck(req.body, req.params.walletId)

  if (!validation.success)
  {
    res.status(500)
    res.send({ message: validation.message })
    return
  }

  const status = await profile.setProfile(newInfo)

  res.status(status)
  res.send({
    message: "This API will be deprecated. Find out more at our swagger docs.",
  })
})

router.patch("/edit/nickname/:walletId", async (req, res) =>
{
  const newInfo = {
    wallet_id: req.params.walletId,
    nickname: req.body.info.nickname.slice(0, 10),
  }

  const validation = await auth.ownerCheck(req.body, req.params.walletId)

  if (!validation.success)
  {
    res.status(500)
    res.send({ message: validation.message })
    return
  }

  const status = await profile.setNickname(newInfo)

  res.status(status)
  res.send({
    message: "This API will be deprecated. Find out more at our swagger docs.",
  })
})

router.patch("/edit/description/:walletId", async (req, res) =>
{
  const newInfo = {
    wallet_id: req.params.walletId,
    description: req.body.info.description,
  }

  const validation = await auth.ownerCheck(req.body, req.params.walletId)

  if (!validation.success)
  {
    res.status(500)
    res.send({ message: validation.message })
    return
  }

  const status = await profile.setDescription(newInfo)

  res.status(status)
  res.send({
    message: "This API will be deprecated. Find out more at our swagger docs.",
  })
})

router.patch("/edit/imageuri/:walletId", async (req, res) =>
{
  const newInfo = {
    wallet_id: req.params.walletId,
    image_uri: req.body.info.image_uri,
  }

  const validation = await auth.ownerCheck(req.body, req.params.walletId)

  if (!validation.success)
  {
    res.status(500)
    res.send({ message: validation.message })
    return
  }

  const status = await profile.setImageURI(newInfo)

  res.status(status)
  res.send({
    message: "This API will be deprecated. Find out more at our swagger docs.",
  })
})

router.patch("/edit/gallery/:walletId", async (req, res) =>
{
  const newInfo = {
    wallet_id: req.params.walletId,
    gallery: req.body.info.gallery,
  }

  const validation = await auth.ownerCheck(req.body, req.params.walletId)

  if (!validation.success)
  {
    res.status(500)
    res.send({ message: validation.message })
    return
  }

  const status = await profile.setGallery(newInfo)

  res.status(status)
  res.send({
    message: "This API will be deprecated. Find out more at our swagger docs.",
  })
})

router.patch("/:wallet_address", async (req, res) =>
{
  let status_code = 500
  let result

  try
  {
    if (
      Object.keys(req.body).length == 0 ||
      !req.body.info ||
      !req.body.info.timestamp ||
      !req.body.hash_sign
    )
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    const newInfo = {
      wallet_id: req.params.wallet_address,
      ...req.body.info,
    }

    if (newInfo[ "nickname" ])
      newInfo[ "nickname" ] = newInfo[ "nickname" ].slice(0, 10)

    const validation = await auth.ownerCheck(
      req.body,
      req.params.wallet_address
    )

    if (!validation.success)
    {
      status_code = 403
      result = { message: validation.message }
      return
    }

    result = await profile.getProfile(req.params.wallet_address)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await profile.setProfile(newInfo)
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

router.patch("/:wallet_address/nickname", async (req, res) =>
{
  let status_code = 500
  let result

  try
  {
    if (
      Object.keys(req.body).length == 0 ||
      !req.body.info ||
      !req.body.info.timestamp ||
      !req.body.hash_sign ||
      !req.body.info.nickname
    )
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    const newInfo = {
      wallet_id: req.params.wallet_address,
      ...(req.body.info.nickname && {
        nickname: req.body.info.nickname.slice(0, 10),
      }),
    }

    const validation = await auth.ownerCheck(
      req.body,
      req.params.wallet_address
    )

    if (!validation.success)
    {
      status_code = 403
      result = { message: validation.message }
      return
    }

    result = await profile.getProfile(req.params.wallet_address)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await profile.setNickname(newInfo)
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

router.patch("/:wallet_address/description", async (req, res) =>
{
  let status_code = 500
  let result

  try
  {
    if (
      Object.keys(req.body).length == 0 ||
      !req.body.info ||
      !req.body.info.timestamp ||
      !req.body.hash_sign ||
      !req.body.info.description
    )
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    const newInfo = {
      wallet_id: req.params.wallet_address,
      ...(req.body.info.description && {
        description: req.body.info.description,
      }),
    }

    const validation = await auth.ownerCheck(
      req.body,
      req.params.wallet_address
    )

    if (!validation.success)
    {
      status_code = 403
      result = { message: validation.message }
      return
    }

    result = await profile.getProfile(req.params.wallet_address)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await profile.setDescription(newInfo)
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

router.patch("/:wallet_address/image-uri", async (req, res) =>
{
  let status_code = 500
  let result

  try
  {
    if (
      Object.keys(req.body).length == 0 ||
      !req.body.info ||
      !req.body.info.timestamp ||
      !req.body.hash_sign ||
      !req.body.info.image_uri
    )
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    const newInfo = {
      wallet_id: req.params.wallet_address,
      ...(req.body.info.image_uri && { image_uri: req.body.info.image_uri }),
    }

    const validation = await auth.ownerCheck(
      req.body,
      req.params.wallet_address
    )

    if (!validation.success)
    {
      status_code = 403
      result = { message: validation.message }
      return
    }

    result = await profile.getProfile(req.params.wallet_address)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await profile.setImageURI(newInfo)
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

router.patch("/:wallet_address/gallery", async (req, res) =>
{
  let status_code = 500
  let result

  try
  {
    if (
      Object.keys(req.body).length == 0 ||
      !req.body.info ||
      !req.body.info.timestamp ||
      !req.body.hash_sign ||
      !req.body.info.gallery
    )
    {
      status_code = 400
      result = { message: "Invaild request" }
      return
    }

    const newInfo = {
      wallet_id: req.params.wallet_address,
      ...(req.body.info.gallery && { gallery: req.body.info.gallery }),
    }

    const validation = await auth.ownerCheck(
      req.body,
      req.params.wallet_address
    )

    if (!validation.success)
    {
      status_code = 403
      result = { message: validation.message }
      return
    }

    result = await profile.getProfile(req.params.wallet_address)
    if (!result)
    {
      status_code = 404
      result = { message: `${ controller_name } doesn't exist` }
      return
    }

    status_code = await profile.setGallery(newInfo)
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
