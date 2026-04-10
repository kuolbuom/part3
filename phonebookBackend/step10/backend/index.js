const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

let persons = require('./api/persons.js');
console.log('backend persons', persons);

app.get('/api/persons', (request, response)=> {
    response.json(persons);
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name || !body.number){
        response.status(400).json({
            error: 'the name or number required'
        })
    }

    const generateID = () => {
        const newId = Math.floor(Math.random() * 1000000) + 1;
        return newId;
    }

    const newPerson ={
        name: body.name,
        number: body.number,
        id: generateID()
    }

    console.log('new person added', newPerson)

    persons.push(newPerson);

    response.json(newPerson);
})

app.delete('/api/persons/:id', (request,response)=> {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id!==id);

    response.json({message: 'this id is deleted'})
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, (request, response)=> {
    console.log(`Server in running on this port ${PORT}`);
})