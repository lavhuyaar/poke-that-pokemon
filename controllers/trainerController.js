const db = require("../db/queries");

exports.getAllTrainers = async (req, res) => {
  const trainers = await db.getTrainers();
  res.render("trainers", {
    title: "Pokemon Trainers",
    trainers: trainers,
  });
};

exports.createTrainer = async (req, res) => {
  const name = req.body.name;
  await db.addTrainer(name);
  res.redirect("/trainers");
};

exports.getTrainerDetails = async (req, res) => {
  const { name } = req.params;
  const details = await db.getTrainerDetails(name);
  const pokemonOptions = await db.getPokemons();
  res.render("trainerDetails", {
    title: `${details[0]?.name} - Trainer Details`,
    trainerName: name,
    details: details,
    pokemonOptions: pokemonOptions,
  });
};

exports.createPokemonToTrainer = async (req, res) => {
  const { name } = req.params;
  const pokemonName = req.body.pokemonName;

  await db.addPokemonToTrainer(name, pokemonName);

  res.redirect(`/trainers/${name}`);
};

exports.updateTrainer = async (req, res) => {
  const { name } = req.params;
  const updatedName = req.body.updatedName;

  await db.editTrainer(name, updatedName);
  res.redirect(`/trainers/${updatedName}`);
};
