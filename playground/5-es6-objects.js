// Object property shorthand

const user = {
    name: "Smit",
    age: 21,
    address: {
        city: "botad",
        state: "gujrat"
    }
}

const {name:myName, age=10, address} = user;
console.log(myName, age, address);
