const  mongoose  = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)

mongoose.connect(url, {family: 4})
.then(()=> {
  console.log('mongoDB connected')
}).catch(error => {
    console.log('Error, connect to mongoDB')
})

const personSchema = mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    date: {
        type:Date,
        default:Date.now
    }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)