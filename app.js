var koa = require('koa')
  , router = require('koa-router')
  , hbs = require('koa-hbs')
  , path = require('path')

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

console.log(app.keys)

app.get('/', function *(next) {
  yield this.render('index', {issues: []})
})
