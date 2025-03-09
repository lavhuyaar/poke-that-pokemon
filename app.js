const path = require("node:path");
const express = require("express");

require("dotenv").config();
const app = express();

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}!`);
  });