const express = require('express');

const app = express();

const info = require('./info.js');
console.log('all informations', info);

app.get('/info', (request, response) => {
    const infoLength = info.length;
    const date = new Date();

    response.send(`
        <p>Phoenebook has info for ${infoLength} people</p>
         <p>${date}</p>
        `)
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on this port ${PORT}`)
})