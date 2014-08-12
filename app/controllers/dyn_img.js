var serve = require('koa-common').static

var dynImg = serve(process.env.DATA_DIR)

module.exports = dynImg
