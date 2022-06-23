const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
        title: 'Help Page',
        name: 'Ankit Chauhan'
    });
});

app.get('/weather', (req, res)=>{
    const query = req.query;
    if(!query.address) return returnErrorResponse(res, 'address is requierd');
    geocode.loadGeoCode(query.address, (geoCodeData = {}, geoCodeError)=>{
        if(geoCodeError) return returnErrorResponse(res, geoCodeError);
        forecast.loadForecast(geoCodeData, (foreCastData, foreCastError)=>{
            if(foreCastError) return returnErrorResponse(res, foreCastError);
            res.send(foreCastData);
        });
    });
});

app.get('/products', (req, res)=>{

    const queries = req.query;
    if(!queries.search){
        return returnErrorResponse(res, 'You must provide a search term');
    }
    res.send({
        products: []
    });

})


app.get('/help/*', (req, res)=>{
    res.render("404", {
        errorCode: '404',
        errorMessage: 'Help Article not found'
    });
});

app.get('*', (req,res)=>{
    res.render("404", {
        errorCode: '404',
        errorMessage: 'Route is not found'
    });
});

const returnErrorResponse = (res,error)=>{
    return res.send({error});
}

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});