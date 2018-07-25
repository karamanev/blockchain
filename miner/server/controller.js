const CryptoJS = require('crypto-js')
const request = require('request')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.previousHash = previousHash
        this.timestamp = timestamp
        this.data = data
        this.nonce = 0
        this.hash = this.calculateHash()
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !==
            Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log(this.hash)
    }
    calculateHash() {
        return CryptoJS.SHA256(this.index +
            this.previousHash +
            this.timestamp +
            this.nonce
        ).toString()
    }
}

module.exports = {
    home: (req, res) => {
        return res.render('home/index')
    },
    mine: (req, res) => {
        request('http://localhost:8080/get-miner-job', async function (error, response, body) {
            let start = new Date().getTime()
            let res = JSON.parse(body)
            let difficulty = res.difficulty
            let previousHash = res.prevBlockHash
            let index = res.index
            let timestamp = Date.now()

            let block = new Block(index, timestamp, '', previousHash)
            console.log('Now we are mining...')
            block.mineBlock(difficulty)

            console.log(block)

            let options = {
                uri: 'http://localhost:8080/submit-block/',
                method: 'POST',
                json: {
                    'previousHash': block.previousHash,
                    'index': block.index,
                    'timestamp': block.timestamp,
                    'nonce': block.nonce,
                    'hash': block.hash,
                    'address': 'http://localhost:3002'
                }
            }

            await request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            })
            console.log('Block mined!')
            let end = new Date().getTime()
            let time = end - start
            console.log(`Execution time: ${time} milliseconds`)
        })

        let info = 'Congratulations, you mined next block and you earn 1 coin!'
        return res.render('home/index', { info: info })
    },
}