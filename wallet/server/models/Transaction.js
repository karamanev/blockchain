const mongoose = require('mongoose')

let transactionSchema = new mongoose.Schema({
    senderAddress: { type: mongoose.Schema.Types.String, required: true },
    recipientAddress: { type: mongoose.Schema.Types.String, required: true },
    value: {type: mongoose.Schema.Types.String, required: true },
    fee: {type: mongoose.Schema.Types.String, required: true },
    date: { type: mongoose.Schema.Types.Date, default: Date.now },
    ballance: {type: mongoose.Schema.Types.Number, default: 0 },
    senderPubKey: {type: mongoose.Schema.Types.String, required: true },
    recipientPubKey: {type: mongoose.Schema.Types.String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction