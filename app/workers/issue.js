var Queue = require('bull')
  , log = require('debug')('comics:worker')


var queueHost = process.env.QUEUE_HOST
  , queuePort = process.env.QUEUE_PORT

var issueQueue
module.exports = issueQueue = Queue('issue extracting', queuePort, queueHost)

issueQueue.process(function (job, done) {
  var IssueProcessor = require('../services/issue_processor')
  var data = job.data
  IssueProcessor(data.file, done)
})

issueQueue.on('failed', function (job, err) {
  log('ERROR %s', err)
})

issueQueue.on('completed', function () {
  log('Completed job')
})