const { Router } = require("express");
const pokemonController = require("../controllers/pokemonController");

const pokemonRoute = Router();
pokemonRoute.get("/", pokemonController.getAllPokemons);

module.exports = pokemonRoute;
