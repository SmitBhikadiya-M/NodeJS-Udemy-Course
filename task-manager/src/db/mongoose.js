const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", { 
    useNewUrlParser: true, // that allows users to old parser if somthing happen wrong with new parser
    useCreateIndex: true, 
    useFindAndModify: false  // to avoid deprecating warning
});


