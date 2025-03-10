const db = require("../db/queries");

exports.getAllPokemonTypes = async (req, res) => {
  const pokemonTypes = await db.getPokemonTypes();
  res.render("pokemonTypes", {
    title: "Pokemon Types",
    pokemonTypes: pokemonTypes,
  });
};
