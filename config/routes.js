var root = require('../app/controllers/root')
  , issues = require('../app/controllers/issues')
  , pages = require('../app/controllers/pages')

issues.add(pages)

module.exports = function (app) {
  app.use(root.middleware())
  app.use(pages.middleware())
}