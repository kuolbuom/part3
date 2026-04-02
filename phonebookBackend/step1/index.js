const express = require('express');

//asigning  app as server
const app = express();

//import entries from api
const persons = require('./api/persons.js');
console.log('all entries', persons);

//use get method to get the entries from api
app.get('/api/persons', (request, response) => {
  response.json(persons);
})

//port running the server
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on this port ${PORT}`)
})