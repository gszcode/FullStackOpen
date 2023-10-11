const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://phonebook:${password}@cluster0.cbqftak.mongodb.net/phonebook`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person.find({}).then((res) => {
    res.forEach((pers) => console.log(pers))
    mongoose.connection.close()
  })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then((result) => {
  console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  mongoose.connection.close()
})
