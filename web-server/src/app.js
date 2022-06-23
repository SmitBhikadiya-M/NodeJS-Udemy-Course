const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

// define path for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// get instance of express
const app = express();

// set handlebars engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// set static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Home page',
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
        title: 'Help Page',
        name: 'Ankit Chauhan'
    });
});

app.get('/weather', (req, res)=>{
    res.send("<h1>Hello Weather</h1>");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});