require("../src/db/mongoose");
const User = require("../src/models/user");
const user = require("../src/models/user");

User.findByIdAndUpdate("62bad16225ca0dccc616b434", { age: 1 })
  .then((user) => {
    return User.countDocuments({ age: 1 });
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
