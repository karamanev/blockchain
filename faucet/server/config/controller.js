const request = require('request')
const encryption = require('./encryption')
const Recaptcha = require('express-recaptcha').Recaptcha
var recaptcha = new Recaptcha('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe')

module.exports = {
    index: (req, res) => {
        res.render('home/index', { captcha: res.recaptcha });
    },

    transaction: (req, res) => {
            let requested = req.body
            let from = 'faucet address'
            let to = requested.address
            let value = 1
            let fee = 0
            let data = ''
            let transaction = '' + from + to + value + fee + data

            let hash = encryption.hashTransaction(transaction)

            let node = '' + requested.node
            request.post(node, {
                from,
                to,
                value,
                fee,
                data,
                hash
            })

            console.log(node, from, to, value, fee, data, hash)
            
            res.render('home/done', { to: to })
    },
}