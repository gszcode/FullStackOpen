const mongoose = require('mongoose')

const url = process.env.MONGO_URL
mongoose
  .connect(url)
  .then((res) => {
    console.log('connected MongoDb')
  })
  .catch((err) => {
    console.log('error connecting MongoDB', err)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, unique: true },
  number: { type: String, required: true }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
