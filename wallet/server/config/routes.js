const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/index.html', controllers.home.index)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.get('/users/logout', controllers.users.logout)

  app.get('/wallet/account', auth.isAuthenticated, controllers.wallet.accountGet)
  app.get('/wallet/check', auth.isAuthenticated, controllers.wallet.accountCheck)

  app.get('/wallet/send', auth.isAuthenticated, controllers.wallet.transactionGet)
  app.post('/wallet/send', auth.isAuthenticated, controllers.wallet.transactionPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}