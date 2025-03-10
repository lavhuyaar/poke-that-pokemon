const { Router } = require("express");
const pokemonTypeController = require("../controllers/pokemonTypeController");

const pokemonTypeRoute = Router();

pokemonTypeRoute.get("/", pokemonTypeController.getAllPokemonTypes);

module.exports = pokemonTypeRoute;
