require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const db = require("knex")(config);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { RecipeSearchClient } = require("edamam-api");

const client = new RecipeSearchClient({
  appId: process.env.REACT_APP_API_ID,
  appKey: process.env.REACT_APP_API_KEY
});

const createJWT = user => {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: ONE_WEEK
  });
};

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db("users")
    .select()
    .where({ username })
    .returning("*")
    .into("users");
  const validPassword = await bcrypt.compare(password, user[0].password);
  if (!validPassword) {
    return res.status(403).send({
      error: "The password was incorrect."
    });
  }
  const token = createJWT(user[0]);
  res.json({
    user: user[0],
    token
  });
});

app.get("/api/test", (req, res) => {
  res.send("This is my test route");
});

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
    const token = createJWT(newUser[0]);
    res.json({
      user: newUser[0],
      token
    });
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
    const { item, quantity } = req.body;
    const food = await db("food_items")
      .insert({ user_id, item, quantity })
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

app.post("/api/recipes", async (req, res) => {
  const recipes = await client.search({ query: req.body.query });
  res.send(recipes);
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "build"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
