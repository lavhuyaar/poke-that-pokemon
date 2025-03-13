const db = require("../db/queries");

exports.getAllTrainers = async (req, res) => {
  const trainers = await db.getTrainers();
  const pokemonOptions = await db.getPokemons();
  res.render("trainers", {
    title: "Pokemon Trainers",
    trainers: trainers,
    pokemonOptions: pokemonOptions,
  });
};

exports.createTrainer = async (req, res) => {
  const name = req.body.name;
  const pokemonName = req.body.pokemonName;
  await db.addTrainer(name, pokemonName);
  res.redirect("/trainers");
};

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

exports.updateTrainer = async (req, res) => {
  const { name } = req.params;
  const updatedName = req.body.updatedName;

  await db.editTrainer(name, updatedName);
  res.redirect(`/trainers/${updatedName}`);
};

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
