const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

module.exports = (app) => {
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
  }))
  app.set('view engine', 'hbs')
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static('static'))

  console.log('Express ready!')
}
