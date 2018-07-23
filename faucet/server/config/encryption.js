let elliptic = require('elliptic')
let EC = new elliptic.ec('secp256k1')
const SHA256 = require("crypto-js/sha256");

module.exports = {
    getSignature: (hexString, privateKey) => {
        let key = EC.keyFromPrivate(privateKey)
        return key.sign(hexString).toDER('hex')
    },

    hashTransaction: (transaction) => {
        return SHA256(transaction).toString()
    },
}
