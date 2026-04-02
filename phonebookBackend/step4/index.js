const express = require('express');

const app = express();

const persons = require('./api/persons.js');
console.log('all persons', persons);

app.delete('/api/persons/:id', (request, response)=> {
    const id = Number(request.params.id);
    console.log('all persons ids,',id,'type,', typeof(id));

    const deleteId = persons.filter(person => person.id!==id);
    console.log(deleteId)

    response.status(204).end()
})


const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`Server is running on this port ${PORT}`)
})