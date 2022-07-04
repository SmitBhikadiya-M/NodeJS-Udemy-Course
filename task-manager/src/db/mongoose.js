const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true, // that allows users to old parser if somthing happen wrong with new parser
    useCreateIndex: true, 
    useFindAndModify: false  // to avoid deprecating warning
});


