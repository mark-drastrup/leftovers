const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Welcome to Leftovers");
});

app.get("/food", (req, res) => {
  res.send("Here's a list of fooditems");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
