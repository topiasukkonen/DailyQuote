const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const mongoose= require("mongoose")

const url = process.env.MONGODB_URI

mongoose.connect(url)

const noteSchema= new mongoose.Schema({
  text: String
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

let dailyQuote = "Quotes are great"

function setNewQuote() {
  Note.find({}).then(quote => {
    Note.count().then(notesCount => {
      randNum = Math.floor((Math.random() * (notesCount - 1)));
      dailyQuote = quote[randNum].text
      console.log(dailyQuote)
    }) 
  })
}

setInterval(() => {
  setNewQuote()
}, 360000  )
/*
const note = new Note({
  text: 'HTML is Easy'
})

note.save().then(result => {
  console.log('note saved!')
})
*/


app.get('/', (request, response) => {
  Note.find({}).then(quotes => {  
    response.json(quotes)
  })
})
app.get('/dailyQuote', (request, response) => {
    response.json(dailyQuote)
})

app.post("/", (request, response) => {
  const body = request.body
  const note = new Note({
    text: body.text
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
  //quotes = quotes.concat(bod.text)
  //console.log(bod)
  //response.json(bod)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})