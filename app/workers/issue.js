var Queue = require('bull')


var queueHost = process.env.QUEUE_HOST
  , queuePort = process.env.QUEUE_PORT

var issueQueue
module.exports = issueQueue = Queue('issue extracting', queuePort, queueHost)

issueQueue.process(function (job, done) {
  console.log(job)
  var Issue = require('../../config/db').models.issue
  var data = job.data
  Issue.processArchive(data.file, done)
})

issueQueue.on('failed', function (job, err) {
  console.log(err)
})