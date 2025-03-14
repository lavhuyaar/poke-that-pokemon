const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validatePokemon = [
  body("type")
    .trim()
    .isAlpha()
    .withMessage("Pokemon type must contain only letters")
    .isLength({ min: 1, max: 50 })
    .withMessage("Pokemon type must be between 1 and 50 characters"),
  body("image")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Image must be between 1 and 500 letters"),
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Pokemon's name must contain only letters")
    .isLength({ min: 1, max: 50 })
    .withMessage("Pokemon's name must be between 1 and 50 characters"),
];

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
exports.createPokemon = [
  validatePokemon,
  async (req, res) => {
    const pokemons = await db.getPokemons();
    const types = await db.getPokemonTypes();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pokemons", {
        title: "Pokemons",
        pokemons: pokemons,
        pokemonTypes: types,
        errors: errors.array(),
      });
    }

    const { name, type, type2, image } = req.body;
    await db.addPokemon(name, type, type2, image);
    res.redirect("/pokemons");
  },
];

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

exports.updatePokemon = [
  validatePokemon,
  async (req, res) => {
    const { name } = req.params;
    const details = await db.getPokemonDetails(name);
    const options = await db.getPokemonTypes();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pokemonDetails", {
        title: `${name} - Details`,
        pokemonDetails: details,
        options: options,
        errors: errors.array(),
      });
    }

    const pokemonName = req.body.name;
    const { type, type2, image } = req.body;
    await db.editPokemon(pokemonName, type, type2, image);
    res.redirect("/pokemons");
  },
];

exports.deletePokemon = async (req, res) => {
  const { name } = req.params;
  await db.removePokemon(name);
  res.redirect("/pokemons");
};
