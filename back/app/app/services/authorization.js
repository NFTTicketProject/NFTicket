const eth = require('ethers')

module.exports = {
    ownerCheck : async (param, verkey)=>{
        if (!param.info.timestamp)
            return false

        if (Math.abs(new Date(param.info.timestamp) - new Date()) > 300000)
            return false

        return verkey == eth.utils.verifyMessage(JSON.stringify(param.info), param.hash_sign)
    },
}
