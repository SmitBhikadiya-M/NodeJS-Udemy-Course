const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/users");
const {
  setupDB,
  userOne,
  userTwo
} = require("./requirements/db");

beforeEach(setupDB);

test("Should User Login!!", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should User Signup!!", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      name: userTwo.name,
      email: userTwo.email,
      password: userTwo.password,
    })
    .expect(201);

  const userRes = await User.findOne({ _id: res.body.user._id });

  expect(userRes).not.toBeNull();

  expect(userRes).toMatchObject({
    name: userTwo.name,
    email: userTwo.email,
  });
});

test("Should User not signup!!!", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      name: userOne.name,
      email: userOne.email,
      password: userOne.password,
    })
    .expect(400);
});

test("Should User Update!!", async () => {
  const res = await request(app)
    .patch("/users")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Smit Patel" })
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user).not.toBeNull();
  expect(user.name).toBe("Smit Patel");
});

test("Should User Logout!!", async () => {
  const res = await request(app)
    .post("/users/me/logout")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user).not.toBeNull();
});