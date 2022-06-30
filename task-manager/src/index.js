const express = require('express');
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require('events').EventEmitter.defaultMaxListeners = 15;

const app = express();
const port = process.env.PORT || 3000;

const multer = require("multer");
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error("Upload only word document!!"));
        }
        cb(undefined, true);
    }
});


const errorMiddleWare = (req, res, next) => {
    throw new Error("From My Middleware");
}
app.post('/upload', upload.single('upload') ,(req, res)=>{
    res.send({});
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

app.use(express.json()); 
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log("Server is running on "+port);
});