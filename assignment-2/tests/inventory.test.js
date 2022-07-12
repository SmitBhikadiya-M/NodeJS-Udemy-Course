const {
  userOne,
  userOneId,
  InvetoryOne,
  InventoryTwo,
  InventroyTwo,
  InventoryTwoId,
  setupDB,
  InventoryOneId,
  InventoryOne,
} = require("./requirements/db");
const Inventory = require("../src/models/inventory");
const app = require("../src/app");
const request = require("supertest");
const fs = require("fs");
const path = require("path");

beforeEach(setupDB);

test("Should User insert inventory", async () => {
  const inventory = await request(app)
    .post("/inventory")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(InventoryTwo)
    .expect(201);
  expect(inventory.body).toMatchObject({
    name: InventoryTwo.name,
    quantity: InventoryTwo.quantity,
  });

  const d1 = new Date(inventory.body.expiryTime);
  const d2 = new Date();
  expect(inventory.body.is_Expired).toBe(d1.getTime() > d2.getTime());
});

test("Should User Read The Inventory", async () => {
  const inventory = await request(app)
    .get(`/inventory/${InventoryOneId.toString()}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(inventory.body).toMatchObject({
    name: InventoryOne.name,
    quantity: InventoryOne.quantity,
  });
});

test("Should User Update Inventory", async () => {
  const inventory = await request(app)
    .patch(`/inventory/${InventoryOneId.toString()}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Inventory Pro",
    })
    .expect(200);

  expect(inventory.body).toMatchObject({
    name: "Inventory Pro",
    quantity: InventoryOne.quantity,
  });
});

test("Should User Delete Inventory", async () => {
  await request(app)
    .delete(`/inventory/${InventoryOneId.toString()}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const inventory = await Inventory.findById(InventoryOneId);
  expect(inventory.isRemoved).toBe(true);
});

test("Should User Insert And Delete Inventory Image", async () => {
  await request(app)
    .post(`/inventory/${InventoryOneId.toString()}/setimg`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("image", "tests/requirements/inventory.png")
    .expect(200);

  const inventory = await Inventory.findById(InventoryOneId);
  const imgPathDir = path.join(__dirname, `../${inventory.inventoryImage}`);
  expect(fs.existsSync(imgPathDir)).toBe(true);

  await request(app)
    .delete(`/inventory/${InventoryOneId.toString()}/image`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(fs.existsSync(imgPathDir)).toBe(false);
  
});
