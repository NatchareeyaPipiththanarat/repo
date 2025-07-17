const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello Node.JS');
});


app.get('/', (req, res) => {
    console.log(req.query)
    res.send(req.query.name + '' + req.query.age);
});


app.post('/', (req, res) => {
    res.send('Got a POST request');
});

app.put('/', (req, res) => {
    res.send('Got a PUT request');
});

app.delete('/', (req, res) => {
    res.send('Got a DELETE request');
});



app.listen(3000, () => console.log('Server running on port 3000'))