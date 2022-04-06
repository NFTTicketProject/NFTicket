const controller_name = "Block"
const { logger } = require("../../utils/winston")
const Block = require("../../services/block")
const express = require("express")
const router = express.Router()

router.post("/", async (req, res) =>
{
    let status_code = 500
    let result

    try
    {
        result = await Block.getHash(req.body.ticket_id)

        if (result)
        {
            status_code = 200
            return
        } else
        {
            result = await Block.createHash(req.body)
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

router.get("/:ticket_id", async (req, res) =>
{
    let status_code = 500
    let result

    try
    {
        result = await Block.getHash(req.params.ticket_id)

        if (result)
        {
            status_code = 200
            return
        } else
        {
            result = {'message': `${req.params.ticket_id} not exist`}
            status_code = 404
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

module.exports = router
