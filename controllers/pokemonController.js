const db = require("../db/queries");

exports.getAllPokemons = async (req, res) => {
  const pokemons = await db.getPokemons();
  const types = await db.getPokemonTypes();
  res.render("pokemons", {
    title: "Pokemons",
    pokemons: pokemons,
    pokemonTypes: types,
  });
};

//Adds Pokemon
exports.createPokemon = async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const type2 = req.body.type2;
  const image = req.body.image;
  await db.addPokemon(name, type, type2, image);
  res.redirect("/pokemons");
};

exports.getPokemon = async (req, res) => {
  const { name } = req.params;
  const details = await db.getPokemonDetails(name);
  const options = await db.getPokemonTypes();
  res.render("pokemonDetails", {
    title: `${name} - Details`,
    pokemonDetails: details,
    options: options,
  });
};

exports.updatePokemon = async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const type2 = req.body.type2;
  const image = req.body.image;
  await db.editPokemon(name, type, type2, image);
  res.redirect("/pokemons");
};

exports.deletePokemon = async (req, res) => {
  const {name} = req.params;
  await db.removePokemon(name);
  res.redirect('/pokemons');
}