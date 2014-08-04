var root = require('../app/controllers/root')
  , issues = require('../app/controllers/issues')
  , pages = require('../app/controllers/pages')
  , dynImg = require('../app/controllers/dyn_img')

issues.add(pages)

module.exports = function (app) {
  app.use(root.middleware())
  app.use(issues.middleware())
  app.use(pages.middleware())
  app.use(dynImg.middleware())
}