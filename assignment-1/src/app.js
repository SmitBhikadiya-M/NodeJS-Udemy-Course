const repoData = require('./utils/repoData');
const fs = require('fs');
const express = require('express');
const { query } = require('express');

const app = express();
const port = 3000;

app.get('', (req,res)=>{
    res.send('<h1>Welcome to My App</h1>');
});

app.get('/repolist', (req, res)=>{
    const query = req.query;
    repoData.loadRepoData((err, data)=>{
        if(err){
            return res.send({
                error: err
            });
        }else{
            let filterData = [];
            if(query){
                filterData = data.filter((repo) => {
                    let flag = false;
                    if(query.language){
                        if(repo.language && (repo.language.toLowerCase() === query.language.toLowerCase())){
                            flag = true;
                        }else{
                            flag = false;
                        }
                    }
                    if(query.forks){
                        if(flag && repo.forks && repo.forks >= query.forks){
                            flag = true;
                        }else{
                            flag = false;
                        }
                    }
                    if(query.stargazers_count){
                        if(flag && repo.stargazers_count && repo.stargazers_count >= query.stargazers_count){
                            flag = true;
                        }else{
                            flag = false;
                        }
                    }
                    return flag;
                });
            }
            if(filterData.length === 0){
                filterData = data;
            }
            res.send(filterData);
        }
    });
});

app.listen(port, ()=>{
    console.log("Listning port "+port);
})