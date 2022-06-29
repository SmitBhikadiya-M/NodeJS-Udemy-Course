require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("62baf43309a60e134003426d", { completed: true })
// .then((res)=>{
//     return Task.countDocuments({ completed: false });
// }).then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// });

const deleteTaskAndCount = async (id,completed)=>{
    await Task.findByIdAndDelete(id, {completed});
    const count = await Task.countDocuments({completed});
    return count;
}

deleteTaskAndCount("62bbe57421e0b648042355b4", true).then((res)=>{
    console.log("count: "+res);
}).catch((err)=>{
    console.log("err: "+err);
});