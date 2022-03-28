const eth = require('ethers')
const crypto = require("crypto");

let signature = "0xdfe88b630e1ceaf062e1898903675e6584fbb8e9328a2b31525d99f231d6da402c93697746b9823a72550667a598b94ca6fb703d73eac9e76ab6b8e46b26821e1b";

let result = eth.utils.verifyMessage("1111", signature)

console.log(eth)
console.log(result)

param = new Object({
    'test': 1111,
    'test2': 1234,
})

const hash = crypto.createHash('sha256').update(JSON.stringify(param)).digest('hex');

console.log(hash)

console.log(new Date().getTime())

console.log(Math.abs((new Date(1648432995447) - new Date()) / 1000))
