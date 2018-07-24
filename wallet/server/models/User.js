const mongoose = require('mongoose')
const encryption = require('../config/encryption')

let userSchema = new mongoose.Schema({
  username: { type: mongoose.Schema.Types.String },
  salt: { type: mongoose.Schema.Types.String },
  hashedPassword: { type: mongoose.Schema.Types.String },
  publicKey: { type: mongoose.Schema.Types.String },
  blockchainAddress: { type: mongoose.Schema.Types.String },
  coins: { type: mongoose.Schema.Types.Number, default:100 },
  transactions: [{ type: mongoose.Schema.Types.String, default: [] }]

})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User