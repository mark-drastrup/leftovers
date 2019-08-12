const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Welcome to my place");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
