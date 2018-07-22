const app = require('express')()
require('./server/config/express')(app)
require('./server/config/routes')(app)

app.listen(3003)
console.log(`Server listening on port 3003...`)
