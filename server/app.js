require("dotenv").config();
const express = require("express");
const app = express();
const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const db = require("knex")(config);
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db("users")
      .select()
      .where({ id });
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/api/users/", async (req, res) => {
  try {
    const { id, username, password } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await db("users")
      .insert({ id, username, password: hash })
      .returning("*")
      .into("users");
    res.json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const updatedUser = await db("users")
      .where({ id })
      .update({ username, password })
      .returning("*")
      .into("users");
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await db("users")
      .where({ id })
      .del()
      .returning("*")
      .into("users");
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/api/users/:id/food/", async (req, res) => {
  try {
    const { id } = req.params;
    const food = await db("food_items")
      .select()
      .where({ user_id: id });
    res.json(food);
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/api/users/:id/food/", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { id, item, quantity } = req.body;
    const food = await db("food_items")
      .insert({ id, user_id, item, quantity })
      .returning("*")
      .into("food_items");
    res.json(food);
  } catch (error) {
    throw new Error(error);
  }
});

app.patch("/api/users/:id/food/:foodId", async (req, res) => {
  try {
    const { foodId } = req.params;
    const { item, quantity } = req.body;
    const updatedFood = await db("food_items")
      .where({ id: foodId })
      .update({ item, quantity })
      .returning("*")
      .into("food_items");
    res.json(updatedFood);
  } catch (error) {
    throw new Error(error);
  }
});

app.delete("/api/users/:id/food/:foodId", async (req, res) => {
  try {
    const { foodId } = req.params;
    const deletedFood = await db("food_items")
      .where({ id: foodId })
      .del()
      .returning("*")
      .into("food_items");
    res.json(deletedFood);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
