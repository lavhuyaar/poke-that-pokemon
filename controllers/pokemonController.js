const db = require("../db/queries");

exports.getAllPokemons = async (req, res) => {
  const pokemons = await db.getPokemons();
  res.render("pokemons", {
    title: "Pokemons",
    pokemons: pokemons,
  });
};
