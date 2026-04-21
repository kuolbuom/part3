require('dotenv').config()
const express = require('express');

const Person = require('./models/persons.js')

const app = express();
app.use(express.json())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running ont this port ${PORT}`)
})