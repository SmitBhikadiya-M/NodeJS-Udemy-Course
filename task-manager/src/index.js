const express = require('express');
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); 

app.post('/users', (req, res)=>{
    const user = new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

app.get("/users", (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send();
    });
});


app.get("/users/:id", (req, res)=>{
    const param = req.params;
    User.findById(param.id).then((user)=>{
        if(!user) res.status(404).send();
        res.send(user);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

app.get("/tasks", (req, res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.status(500).send();
    });
});


app.get("/tasks/:id", (req, res)=>{
    const param = req.params;
    Task.findById(param.id).then((task)=>{
        if(!task) res.status(404).send();
        res.send(task);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

app.post('/tasks', (req, res)=>{
    const task = new Task(req.body);
    task.save().then((r)=>{
        res.status(201).send(r);
    }).catch((e)=>{
        res.status(400).send(e);
    });
})

app.listen(port, ()=>{
    console.log("Server is running on "+port);
})