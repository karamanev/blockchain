const request = require('request')
const encryption = require('../config/encryption')
const User = require('mongoose').model('User')

module.exports = {
    accountGet: (req, res) => {
        let id = req.session.passport.user
        User.findOne({ _id: id }).then(user => {
            let address = user.blockchainAddress
            return res.render('wallet/account', { address: address })
        })
    },

    accountCheck: (req, res) => {
        request('http://localhost:1234/blocks', async function (error, response, body) {

            let result = JSON.parse(body)
            let resultWork = result.chain
            let tempTransaction = resultWork.map(a => a.transactions).filter(b => b.length !== 0)
            let transaction = [].concat.apply([], tempTransaction)
            //            console.log(transaction)
            let id = req.session.passport.user

            User.findOne({ _id: id }).then(user => {
                let address = user.blockchainAddress
                let filteredSent = transaction.filter(t => t.sender === address)
                let filteredReceived = transaction.filter(t => t.recipient === address)
                let transactions = [].concat.apply([], filteredSent, filteredReceived)
                if (transactions.length > 0)
                    return res.render('wallet/account', { data: transactions })
                else
                    return res.render('wallet/account', { data: `There are no registered transactions with your account: ${address}` })
            })
        })
    },

    transactionGet: (req, res) => {
        return res.render('wallet/send')
    },

    transactionPost: (req, res) => {
        let requested = req.body
        let from = requested.username
        let to = requested.recipient
        let value = Number(requested.value)
        let fee = value / 10
        let data = ''
        let transaction = '' + from + to + value + fee + data
        let signature = encryption.getSignature(transaction, requested.username)

        let id = req.session.passport.user
        User.findOne({ _id: id })
            .then(user => {
                if (from !== user.blockchainAddress) {
                    res.locals.globalError = 'You can send money only from your wallet!'
                    return res.render('wallet/send')
                }
                else if (user.coins < value) {
                    res.locals.globalError = 'You are trying to send more money then you have!'
                    return res.render('wallet/send')
                }
                else if (value <= 0) {
                    res.locals.globalError = 'You must enter valid value for the transaction!'
                    return res.render('wallet/send')
                }
                else {
                    let senderPublickKey = user.publicKey
                    let hash = encryption.hashTransaction(transaction)
                    let node = '' + requested.node
                    let sendData = {
                        "sender": from,
                        "recipient": to,
                        senderPublickKey,
                        "transactionHash": hash,
                        "senderSignature": signature,
                        "amount": value,
                        fee,
                        data,
                    }
                    request.post(node, sendData)
                        .on('error', function (err) {
                            res.locals.globalError = err
                            res.render('wallet/send')
                        })
                        console.log(sendData)
                    let transactionData = {
                        from,
                        to,
                        value,
                        signature,
                        node
                    }
                    return res.render('wallet/send', { transactionData: transactionData })
                }
            })
    }
}