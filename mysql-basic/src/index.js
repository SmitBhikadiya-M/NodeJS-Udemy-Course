const express = require('express');
const conn = require('../db/connect');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/todos', (req, res)=>{
    try{
        conn.query('SELECT * FROM todos', (err, result) => {
            if(err) throw new Error(err);  
            res.send(result); 
        });
    }catch(e){
        res.status(500).send({error: e});
    }
});

app.post('/todos', (req, res)=>{
    try{
        const title = req.body.title;
        if(!title) return res.status(400).send({error: 'Invalid Request!!'});
        conn.query(`INSERT INTO todos (title) VALUES ('${title.trim().toLowerCase()}')`,(err)=>{
            if(err) throw new Error(err);
            res.status(201).send();
        });
    }catch(e){
        res.status(500).send({error: e});
    }
});

app.patch('/todos/:edit', (req, res)=>{
    try{
        const todoId = req.params.edit;
        const data = req.body;
        const reqBodyKeys = Object.keys(data);
        if(!todoId || !data || isNaN(todoId)) return res.status(400).send({error: 'Invalid Request!!'}); 
        conn.query(`SELECT title, isCompleted FROM todos WHERE id=${todoId}`, (err, result)=>{
            if(result.length < 1) return res.status(404).send({error:'User not found!!'});
            const finalData = Object.keys(result[0]).reduce((acc, key)=>{
                if(reqBodyKeys.includes(key)) {  acc[key] = data[key] }
                else acc[key] = result[0][key];
                return acc;
            }, {});
            conn.query(`UPDATE todos SET title='${finalData.title}', isCompleted=${finalData.isCompleted} WHERE id=${todoId}`, (err)=>{
                if(err) return res.status(400).send({error: err});
                res.send();
            })
        });
    }catch(e){
        res.status(500).send({error: e});
    }
});

app.delete('/todos/:delete', (req, res)=>{
    try{
        const todoId = req.params.delete;
        if(!todoId || isNaN(todoId)) return res.status(400).send({error: 'Invalid Request!!'}); 
        conn.query(`SELECT title, isCompleted FROM todos WHERE id=${todoId}`, (err, result)=>{
            if(!todoId || isNaN(todoId)) return res.status(400).send({error: 'Invalid Request!!'}); 
            if(result.length < 1) return res.status(404).send({error:'User not found!!'});
            conn.query(`DELETE FROM todos WHERE id=${todoId}`, (err)=>{
                if(err) return res.status(400).send({error: err});
                res.send();
            });
        });
    }catch(e){
        res.status(500).send({error:e});
    }
});


app.listen(port, ()=>{
    console.log("Listening on port "+port);
    conn.connect((err)=>{
        if(err) return console.error(`Connection Error: ${err.message}`);
        console.log("Connection Successfully!!");
    });
});