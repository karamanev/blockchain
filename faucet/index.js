const app = require('express')()
require('./server/config/express')(app)
require('./server/config/routes')(app)

app.listen(3004)
console.log(`Server listening on port 3004...`)
