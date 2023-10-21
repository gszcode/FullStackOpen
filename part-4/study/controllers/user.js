const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHashed = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHashed
  })
  const savedUser = await user.save()

  return res.status(200).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  return res.json(users)
})

module.exports = usersRouter
