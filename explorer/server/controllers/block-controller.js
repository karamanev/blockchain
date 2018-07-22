const request = require('request')

module.exports = {
    getBlocks: async function (req, res) {
        request('http://localhost:8080/blocks', async function (error, response, body) {
            let result = JSON.parse(body)
            let block = result.chain
            return res.render('block/blocks', { block: block })
        })
    },

    getTransactions: (req, res) => {
        request('http://localhost:8080/blocks', async function (error, response, body) {
            let result = JSON.parse(body)
            let resultWork = result.chain
            console.log(resultWork)
            let tempTransaction = resultWork.map(a => a.transactions).filter(b => b.length !== 0)
            let transaction = [].concat.apply([], tempTransaction)
            return res.render('block/transactions', {transaction: transaction})
        })
    },

    getPending: (req, res) => {

        request('http://localhost:8080/transaction/pending', async function (error, response, body) {
            let result = JSON.parse(body)
        })

        return res.render('block/pending')
    },

    getAccounts: (req, res) => {
        request('http://localhost:8080/accounts', async function (error, response, body) {
            let result = JSON.parse(body)
            console.log(result)
        })

        return res.render('block/accounts')
    }
}