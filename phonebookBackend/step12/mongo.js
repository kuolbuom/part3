require('dotenv').config()

const mongoose = require('mongoose');

// if(process.argv.length < 3){
//     console.log('give password as argument')
//     process.exit(1)
// }

// const password = process.argv[2];

const url = process.env.MONGODB_URI


mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model('Note', phonebookSchema)


  //  const newNote = new Note({
  //     name: "Dan Abramov",
  //     number: "12-43-234345"
  // });

  // newNote.save().then(response => {
  //   console.log('note saved')
  //   mongoose.connection.close();
  // })

  Note.find({}).then(response => {
    response.forEach(note => {
      console.log('phonebook:',note)
    })
  })