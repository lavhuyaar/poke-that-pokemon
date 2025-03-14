const path = require("node:path");
const express = require("express");
const indexRoute = require("./routes/indexRoute");
const pokemonRoute = require("./routes/pokemonRoute");
const pokemonTypeRoute = require("./routes/pokemonTypeRoute");
const trainerRoute = require("./routes/trainerRoute");
require("dotenv").config();

const app = express();

const PORT = process.env.SERVER_PORT || 8080;
const assetsPath = path.join(__dirname, "/public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoute);
app.use("/pokemons", pokemonRoute);
app.use("/pokemon-types", pokemonTypeRoute);
app.use("/trainers", trainerRoute);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on Port ${PORT}!`);
});
