const db = require("../db/queries");

exports.getAllPokemonTypes = async (req, res) => {
  const pokemonTypes = await db.getPokemonTypes();
  res.render("pokemonTypes", {
    title: "Pokemon Types",
    pokemonTypes: pokemonTypes,
  });
};

//Adds Pokemon Type
exports.createPokemonType = async (req, res) => {
  const type = req.body.type;
  await db.addPokemonType(type);
  res.redirect("/pokemon-types");
};
