const express = require('express');

const app = express();

let persons = require('./api/persons.js');
console.log('all the persons', persons);

app.use(express.json());

const generateId = () => {
    const newId = Math.floor(Math.random() * 1000000) + 1;
    return newId;
}

app.post('/api/persons', (request, response)=> {
  const body = request.body;

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number required'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  console.log('added person', person);
   persons.push(person)
  response.json(person)
})


const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`Server is running on this port ${PORT}`)
})