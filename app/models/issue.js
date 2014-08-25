var mongoose = require('mongoose')

module.exports = function () {
  var issueSchema = new mongoose.Schema({
    path: String,
    remarks: String,
    number: Number
  })

  mongoose.model('Issue', issueSchema)
}
