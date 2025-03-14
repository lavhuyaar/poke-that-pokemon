const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validatePokemonType = [
  body("type")
    .trim()
    .isAlpha()
    .withMessage("Pokemon type must contain only letters")
    .isLength({ min: 1, max: 50 })
    .withMessage("Pokemon type must be between 1 and 50 characters"),
];

exports.getAllPokemonTypes = async (req, res) => {
  const pokemonTypes = await db.getPokemonTypes();
  res.render("pokemonTypes", {
    title: "Pokemon Types",
    pokemonTypes: pokemonTypes,
  });
};

//Adds Pokemon Type
exports.createPokemonType = [
  validatePokemonType,
  async (req, res) => {
    const errors = validationResult(req);
    const pokemonTypes = await db.getPokemonTypes();
    if (!errors.isEmpty()) {
      return res.status(400).render("pokemonTypes", {
        title: "Pokemon Types",
        errors: errors.array(),
        pokemonTypes: pokemonTypes,
      });
    }

    const type = req.body.type;
    await db.addPokemonType(type);
    res.redirect("/pokemon-types");
  },
];

exports.deletePokemonType = async (req, res) => {
  const { pokemonType } = req.params;
  await db.removePokemonType(pokemonType);
  res.redirect("/pokemon-types");
};
