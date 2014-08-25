var common = require('koa-common')
  , serve = common.static
  , path = require('path')
  , cors = require('koa-cors')

module.exports = function (app) {
  app.use(common.logger())
  app.use(common.responseTime())
  app.use(cors())
  app.use(common.conditionalGet())
  app.use(common.etag())
  app.use(serve(path.join(__dirname, '..', 'public')))
}
