const  mongoose  = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('mongoDB connected')
  }).catch(() => {
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
    required: true,
    minlength: 8,
    trim: true, //  removes leading/trailing spaces
    validate: {
      validator: function(value) {
        //regex: pattern: 2–3 digits + '-' + rest digits
        return /^\d{2,3}-\d+$/.test(value)
      },
      message: props => `${props.value} is not a valid phone number`
    }
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