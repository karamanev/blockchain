const controller = require('./controller')
const Recaptcha = require('express-recaptcha').Recaptcha
var recaptcha = new Recaptcha('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe')

module.exports = (app) => {
  app.get('/', controller.index)
  app.get('/index.html', controller.index)

  app.post('/transaction', recaptcha.middleware.render, controller.transaction)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}