const express = require('express');

const app = express();

const persons = require('./api/persons.js');
console.log('all persons', persons)

app.get('/api/persons/:id', (request, response)=> {
    const id = request.params.id;
    console.log('the persons ids,',id,'type,',typeof(id));

    const personId = persons.find(person => person.id===id);
    
    if(personId){
       response.json(personId);
    }else{
        response.status(404).end();
    }
})

const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`Server is running on this port ${PORT}`)
})