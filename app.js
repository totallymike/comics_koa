var koa = require('koa')
  , router = require('koa-router')
  , hbs = require('koa-hbs')
  , path = require('path')
  , debug = require('debug')('comics:app')
  , co = require('co')

var app = koa()
module.exports = app

require('./config')(app)

app.use(hbs.middleware({
  viewPath: path.join(__dirname, 'app', 'views'),
  defaultLayout: 'layout'
}))

if (app.env === 'development') {
  var dotenv = require('dotenv')
  dotenv.load()
}

app.keys = [process.env.SESSION_SECRET]
app.use(router(app))

co(function *() {
  var orm = require('./config/db')
  var ontology = yield orm.initDb()
  app.context.models = ontology.collections
})()

require('./app/controllers')
require('./config/routes')(app)