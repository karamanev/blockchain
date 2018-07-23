const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const Recaptcha = require('express-recaptcha').Recaptcha
var recaptcha = new Recaptcha('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe')

module.exports = (app) => {
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
  }))
  app.set('view engine', 'hbs')
  
  app.use(cookieParser())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })

  app.use(express.static('static'))

  console.log('Express ready!')
}
