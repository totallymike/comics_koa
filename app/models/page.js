var mongoose = require('mongoose')
  , Schema = mongoose.Schema

module.exports = function () {
  var pageSchema = new mongoose.Schema({
    number: Number,
    filePath: String,
    issue: { type: Schema.Types.ObjectId, ref: 'Issue' }
  })

  pageSchema.methods.nextPage = function () {
    return this.model('Page').findOne()
               .where({issue: this.issue})
               .where({number: this.number + 1})
  }

  mongoose.model('Page', pageSchema)
}