const express = require('express');

const morgan = require('morgan');


const app = express();

app.use(morgan('logging messages'));


const persons = require('./api/persons.js');
console.log('all persons here', persons);

app.use(express.json());

app.post('/api/persons', (request, response)=> {
    const body = request.body;

    const generateId = ()=> {
        const newId = Math.floor(Math.random() * 1000000) + 1;
        return newId;
    }
  
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'The name or number is missing'
        })
    }

    const ifNameAreadyExist = persons.some(person => person.name===body.name);
    if(ifNameAreadyExist){
        response.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    console.log('person added', person);

    persons.push(person)
    response.json(person)
})


const PORT = 3001;

app.listen(PORT, (request, response) => {
    console.log(`Server is running on this port ${PORT}`);
})