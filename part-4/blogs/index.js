const app = require('./app')
const logger = require('./utils/logger')

app.listen(process.env.PORT, () => {
  logger.info(`Server running on Port: ${process.env.PORT}`)
})
