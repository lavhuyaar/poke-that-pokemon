const { Router } = require("express");
const pokemonTypeController = require("../controllers/pokemonTypeController");

const pokemonTypeRoute = Router();

pokemonTypeRoute.get("/", pokemonTypeController.getAllPokemonTypes);
pokemonTypeRoute.post("/add", pokemonTypeController.createPokemonType);
pokemonTypeRoute.get('/:pokemonType/delete', pokemonTypeController.deletePokemonType);

module.exports = pokemonTypeRoute;
