require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const errorHandler = require('./middlewares/errorHandler')
const blogRoute = require('./routes/notes')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

let MONGODB_URI = process.env.MONGODB_URL
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Error connectiong to MongoDB', err)
  })

app.use('/api/blogs', blogRoute)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
