var controllers = require('../app/controllers')

module.exports = function (app) {
  app.use(controllers.root.middleware())
  app.use(controllers.issues.middleware())
}