const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
  },
  __v: {
    type: Number, 
    select: false
  }
})

module.exports = mongoose.model('User', UserSchema)