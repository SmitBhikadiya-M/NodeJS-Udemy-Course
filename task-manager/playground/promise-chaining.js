require("../src/db/mongoose");
const User = require("../src/models/user");
const user = require("../src/models/user");

// User.findByIdAndUpdate("62bad16225ca0dccc616b434", { age: 1 })
//   .then((user) => {
//     return User.countDocuments({ age: 1 });
//   }).then((result) => {
//     console.log(result);
//   }).catch((err) => {
//     console.log(err);
//   });

  const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
  }

  updateAgeAndCount("62bad6a3b51721d42d3620fb", 2).then((res)=>{
    console.log("count: "+res);
  }).catch((err)=>{
    console.log(err);
  });
