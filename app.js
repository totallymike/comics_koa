var koala = require('koala')
  , app = koala()

module.exports = app

app.use(function *() {
  this.body = 'Hello World'
})