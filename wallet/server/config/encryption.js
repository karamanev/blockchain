const elliptic = require('elliptic')
const EC = new elliptic.ec('secp256k1')
const CryptoJS = require('crypto-js')
const SHA256 = require("crypto-js/sha256");
const crypto = require('crypto')


module.exports = {
    generatePrivateKey: () => {
        let keyPair = EC.genKeyPair()
        let privateKey = keyPair.getPrivate()
        return privateKey.toString(16)
    },

    getPublicKey: (privateKey) => {
        let key = EC.keyFromPrivate(privateKey)
        return key.getPublic().encode('hex')
    },

    getAddress: (publicKey) => {
        return CryptoJS.RIPEMD160(publicKey).toString()
    },

    getSignature: (hexString, privateKey) => {
        let key = EC.keyFromPrivate(privateKey)
        return key.sign(hexString).toDER('hex')
    },

    isValidSignature: (hexString, signature, publicKey) => {
        let key = EC.keyFromPublic(publicKey, 'hex')
        return key.verify(hexString, signature)
    },

    hashTransaction: (transaction) => {
        return SHA256(transaction).toString()
    },

    generateSalt: () => {
        return crypto.randomBytes(128).toString('base64')
    },
    
    generateHashedPassword: (salt, password) => {
        return crypto.createHmac('sha256', salt).update(password).digest('hex')
    }
}
