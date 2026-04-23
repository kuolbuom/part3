require('dotenv').config()
const express = require('express');

const Person = require('./models/persons.js')


const app = express();
app.use(express.json())

app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response)=> {
    Person.findById(request.params.id)
    .then(persons => {
        if(persons){
          response.json(persons)
        }else{
            response.status(404).end()
        }
    })
})


app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date()
            response.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${date}</p>
            `)
        })
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number is missing' })
    }

    Person.findOne({ name: body.name })
    .then(existingPerson => {
        if (existingPerson) {
            return response.status(400).json({ error: 'name must be unique' })
        }

        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person
        .save()
        .then(saved => response.json(saved))
    })
    
})

app.delete('/api/persons/:id', (request, response)=> {
    Person.findByIdAndDelete(request.params.id)
    .then(() => {
        response.status(204).end()
    })
})


app.put('/api/persons/:id', (request, response) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(persons => {
      if (!persons) {
        return response.status(404).end()
      }

      persons.name = name
      persons.number = number

      return persons.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running ont this port ${PORT}`)
})