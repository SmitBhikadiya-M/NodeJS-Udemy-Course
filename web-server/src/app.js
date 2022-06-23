const express = require('express');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '../public');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(publicDir));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Smit Bhikadiya'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Smit Bhikadiya'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page'
    });
});

app.get('/weather', (req, res)=>{
    res.send("<h1>Hello Weather</h1>");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});