const controllers = require('../controllers')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/index.html', controllers.home.index)
  
  app.get('/block/blocks', controllers.block.getBlocks)
  app.get('/block/transactions', controllers.block.getTransactions)  
  app.get('/block/pending', controllers.block.getPending)
//  app.get('/block/accounts', controllers.block.getAccounts)

  
  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
