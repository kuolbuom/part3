require('dotenv').config()
const express = require('express');

const Person = require('./models/persons.js')

const app = express();
app.use(express.json())

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
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

        person.save().then(saved => {
            response.json(saved)
        })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next)=> {
    Person.findByIdAndDelete(request.params.id)
    .then(response => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running ont this port ${PORT}`)
})