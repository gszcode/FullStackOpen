const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
  const { username, name, passwordHash } = req.body

  const saltRounds = 10
  const passwordHashed = await bcrypt.hash(passwordHash, saltRounds)

  const user = new User({
    username,
    name,
    passwordHashed
  })
  const savedUser = await user.save()

  return res.status(204).json(savedUser)
})

module.exports = usersRouter
