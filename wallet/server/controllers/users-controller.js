const encryption = require('../config/encryption')
const User = require('mongoose').model('User')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },

  registerPost: (req, res) => {
    let reqUser = req.body
    let username = '' + encryption.generatePrivateKey()
    let publicKey = '' + encryption.getPublicKey(username)
    let blockchainAddress = '' + encryption.getAddress(username)
    let salt = encryption.generateSalt()

    if (reqUser.password === '' || reqUser.password === undefined) {
      res.locals.globalError = "You must enter a password!"
      res.render('users/register', reqUser)
      return
    }

    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
      username,
      salt,
      hashedPassword,
      publicKey,
      blockchainAddress
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }
        else {
          let walletData = {}
          walletData.private = username
          walletData.public = publicKey
          walletData.address = blockchainAddress
          return res.render('home/inde', { walletData: walletData })
        }
      })
    }).catch(err => console.log(err))
  },

  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {

    User
      .findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid key!'
          return res.render('users/login')
        }
        let username = user.username
        let publicKey = user.publicKey
        let blockchainAddress = user.blockchainAddress

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/login')
          }

          let walletData = {}
          walletData.private = username
          walletData.public = publicKey
          walletData.address = blockchainAddress
          return res.render('home/inde', { walletData: walletData })
        })
      }).catch(err => console.log(err))
  },

  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}