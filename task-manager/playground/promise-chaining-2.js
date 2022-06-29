require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("62baf43309a60e134003426d", { completed: true })
.then((res)=>{
    return Task.countDocuments({ completed: false });
}).then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
});