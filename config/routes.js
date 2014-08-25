var root = require('../app/controllers/root')
  , issues = require('../app/controllers/issues')
  , pages = require('../app/controllers/pages')
  , dynImg = require('../app/controllers/dyn_img')
  , mount = require('koa-common').mount

module.exports = function (app) {
  app.use(root.middleware())
  app.use(issues.middleware())
  app.use(mount('/pages', pages))
  app.use(mount('/dynImg', dynImg))
}
