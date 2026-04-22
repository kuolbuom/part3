require('dotenv').config()
const express = require('express');

const Person = require('./models/persons.js')

const app = express();
app.use(express.json())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number is missing' })
    }

    Person.findOne({ name: body.name }).then(existingPerson => {
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
})

app.delete('/api/persons/:id', (request, response)=> {
    Person.findByIdAndDelete(request.params.id)
    .then(response => {
        response.status(204).end()
    })
    .catch(error => error.message)
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running ont this port ${PORT}`)
})