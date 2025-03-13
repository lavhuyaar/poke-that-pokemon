const { Router } = require("express");
const pokemonController = require("../controllers/pokemonController");

const pokemonRoute = Router();
pokemonRoute.get("/", pokemonController.getAllPokemons);
pokemonRoute.post("/add", pokemonController.createPokemon);
pokemonRoute.get("/:name", pokemonController.getPokemon);
pokemonRoute.post("/:name/edit", pokemonController.updatePokemon);
pokemonRoute.get("/:name/delete", pokemonController.deletePokemon);

module.exports = pokemonRoute;
