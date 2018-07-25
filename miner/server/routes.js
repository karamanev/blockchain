const controller = require('./controller')

module.exports = (app) => {
  
  app.get('/', controller.home)
  app.get('/index.html', controller.home)

  app.get('/mine', controller.mine)
 
  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
