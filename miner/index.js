const app = require('express')()
require('./server/express')(app)
require('./server/routes')(app)

app.listen(3002)
console.log(`Server listening on port 3002...`)
