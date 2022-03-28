const eth = require('ethers')
const crypto = require('crypto')

module.exports = {
    ownerCheck : async (param, verkey)=>{
        if (!param.info.timestamp)
            return false

        if (Math.abs(new Date(param.info.timestamp) - new Date()) > 300000)
            return false

        const hash = crypto.createHash('sha256').update(JSON.stringify(param.info)).digest('hex');

        return verkey == eth.utils.verifyMessage(hash, param.sign)
    },
}
