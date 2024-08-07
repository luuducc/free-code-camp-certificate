const mongoose = require("mongoose")
const User = require('./User')
const ExerciseSchema = new mongoose.Schema({
  username: String,
  description: {
    type: String, 
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

ExerciseSchema.pre('save', async function (next) {
  try {
    const user = await User.findById(this.userId)
    console.log(user)
    this.username = user.username
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = mongoose.model('Exercise', ExerciseSchema)