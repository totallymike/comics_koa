var mongoose = require('mongoose')

module.exports = function () {
  var issueSchema = new mongoose.Schema({
    path: String,
    number: Number
  })

  mongoose.model('Issue', issueSchema)
}
