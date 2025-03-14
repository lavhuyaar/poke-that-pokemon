const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateTrainer = [
  body("name")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Trainer's name must contain only letters")
    .isLength({ min: 1, max: 50 })
    .withMessage("Trainer's name must be between 1 and 50 characters"),
  body("pokemonName")
    .trim()
    .isAlpha()
    .withMessage("Pokemon name must contain only letters")
    .isLength({ min: 1, max: 50 })
    .withMessage("Pokemon's name must be between 1 and 50 characters"),
];

const validateEditTrainer = [
  body("updatedName")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Trainer's name must contain only letters")
    .isLength({ min: 1, max: 50 })
    .withMessage("Trainer's name must be between 1 and 50 characters"),
];

exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await db.getTrainers();
    const pokemonOptions = await db.getPokemons();
    res.render("trainers", {
      title: "Pokemon Trainers",
      trainers: trainers,
      pokemonOptions: pokemonOptions,
    });
  } catch (error) {
    console.error("Error retrieving author:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createTrainer = [
  validateTrainer,
  async (req, res) => {
    const errors = validationResult(req);

    const trainers = await db.getTrainers();
    const pokemonOptions = await db.getPokemons();

    if (!errors.isEmpty()) {
      return res.status(400).render("trainers", {
        title: "Pokemon Trainers",
        trainers: trainers,
        pokemonOptions: pokemonOptions,
        errors: errors.array(),
      });
    }

    const { name, pokemonName } = req.body;

    await db.addTrainer(name, pokemonName);
    res.redirect("/trainers");
  },
];

exports.getTrainerDetails = async (req, res) => {
  const { name } = req.params;
  const details = await db.getTrainerDetails(name);
  const pokemonOptions = await db.getPokemons();
  res.render("trainerDetails", {
    title: `${details[0]?.trainername || name} - Trainer Details`,
    trainerName: details[0]?.trainername || name,
    details: details,
    pokemonOptions: pokemonOptions,
  });
};

exports.createPokemonToTrainer = async (req, res) => {
  const { name } = req.params;
  const pokemonName = req.body.pokemonName;

  if (!name || !pokemonName) return;

  await db.addPokemonToTrainer(name, pokemonName);

  res.redirect(`/trainers/${name}`);
};

exports.updateTrainer = [
  validateEditTrainer,
  async (req, res) => {
    const { name } = req.params;
    const details = await db.getTrainerDetails(name);
    const pokemonOptions = await db.getPokemons();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("trainerDetails", {
        title: `${details[0]?.trainername || name} - Trainer Details`,
        trainerName: details[0]?.trainername || name,
        details: details,
        pokemonOptions: pokemonOptions,
        errors: errors.array(),
      });
    }

    const updatedName = req.body.updatedName;

    await db.editTrainer(name, updatedName);
    res.redirect(`/trainers/${updatedName}`);
  },
];

exports.deletePokemonFromTrainer = async (req, res) => {
  const { name, pokemonName } = req.params;
  await db.removePokemonFromTrainer(name, pokemonName);
  res.redirect("/trainers");
};

exports.deleteTrainer = async (req, res) => {
  const { name } = req.params;
  await db.removeTrainer(name);
  res.redirect("/trainers");
};
