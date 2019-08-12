require("dotenv").config();
const express = require("express");
const app = express();
const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const db = require("knex")(config);

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
    const newUser = await db("users")
      .insert({ id, username, password })
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

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
