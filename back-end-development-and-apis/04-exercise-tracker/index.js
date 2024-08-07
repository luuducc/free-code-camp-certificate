const { v4: uuidv4 } = require("uuid")
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./User')
const Exercise = require('./Exercise')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v')
    res.json(users)
  } catch (err) {
    res.json(err)
  }
})
app.post('/api/users', async (req, res) => {
  const { username } = req.body
  try {
    const user = await User.create({ username })
    const { _id } = user
    res.json({ username, _id })
  } catch (err) {
    res.json({ err })
  }
})
app.post('/api/users/:userId/exercises', async (req, res) => {
  const { params: { userId }, body: { description, duration } } = req
  let { date } = req.body
  date = !date ? new Date() : new Date(date)
  console.log(date)
  try {
    const exercise = await Exercise.create({ userId, description, duration, 
      date })
    console.log(exercise)
    const user = await User.findById(userId)
    res.json({ 
      _id: user._id,
      username: user.username,
      date: exercise.date.toDateString(),
      duration: exercise.duration,
      description: exercise.description
    })
  } catch (err) {
    console.log(err)
    res.json({err})
  }
})
app.get('/api/users/:userId/logs', async (req, res) => {
  const { query: { from, to }, params: { userId } } = req
  let queryObject = { userId }
  if (from) {
    queryObject.date = { $gte: new Date(from)}
  }
  if (to) {
    queryObject.date = { ...queryObject.date, $lte: new Date(to)}
  }
  const limit = Number(req.query.limit) || 10
  try {
    const exercises = await Exercise.find(queryObject).limit(limit)
    if (exercises.length == 0) return res.json("no exercise valid")
    const { userId: _id, username } = exercises[0]
    res.json({
      _id, username, count: exercises.length, 
      log: exercises.map(
        ({ description, duration, date }) => ({ description, duration, date: date.toDateString() })
      )
    })
  } catch (err) {
    res.json({ err })
  }

})

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('connected to the db')
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
}

start()

