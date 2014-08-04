var Resource = require('koa-resource-router')
  , koaBody = require('koa-better-body')
  , send = require('koa-send')

var dynImg = new Resource('dynImg', {
  show: [koaBody(), function *(next) {
    var dataDir = process.env.DATA_DIR
      , imageTarget = decodeURI(this.params.dynImg)

    yield send(this, imageTarget, { root: dataDir })
    yield next
  }]
})
dynImg.routes[0].regexp = /^\/dynImg\/(?:(.+?))\/?$/i
module.exports = dynImg
