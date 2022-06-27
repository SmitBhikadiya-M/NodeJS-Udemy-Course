const repoData = require('./utils/repoData');
const fs = require('fs');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const converter = require("./utils/json2csvConversation");
const cors = require('cors');

// application level declration
const app = express();
const port = process.env.PORT || 3000;
const corsOption = {
    origin: '*'
};

// defining path
const publicDir = path.join(__dirname , '../public');
const partialHBSDir = path.join(__dirname , '../templates/partials');
const viewsHBSDir = path.join(__dirname , '../templates/views');


// template engine configuration for handlebar
app.set('view engine', 'hbs');
app.set('views', viewsHBSDir);
hbs.registerPartials(partialHBSDir);


app.use(express.static(publicDir));
app.use(cors(corsOption));

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Assignment',
        name: 'Smit Bhikadiya'
    });
});

app.get('/a1', (req,res)=>{
    res.render('assignment1', {
        title: 'Assignment-1',
        name:"Smit Bhikadiya"
    });
});

// github repository endpoint
app.get('/repolist', (req, res)=>{
    const query = req.query;
    repoData.loadRepoData((err, data)=>{
        if(err){
            return res.send({
                error: err
            });
        }else{
            let filterData = data;
            if(query && query.stargazers_count){
                filterData = data.filter((repo) => {
                    if(repo.stargazers_count && repo.stargazers_count >= query.stargazers_count){
                        return true;
                    }else{
                        return false;
                    }
                });
            }
            if(filterData.length === 0){
                return res.send({
                    error: "No Record Found"
                });
            }

            if(query && query.download && query.download === 'csv'){
                converter(filterData, (err)=>{
                    if(err!==''){
                        return res.send({ err });
                    }
                });
            }  

            res.send(filterData);
        }
    });
});

app.get('*', (req,res)=>{
    res.render('error', {
        title: 'Assignment',
        name: 'Smit Bhikadiya',
        errorMessage: 'Invalid Request: Page Not Found!!',
        errorCode: '404'
    });
});

app.listen(port, ()=>{
    console.log("Listning port "+port);
})