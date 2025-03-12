const pool = require("./pool");

//Queries

const getPokemons = async () => {
  const { rows } = await pool.query(
    "SELECT name, type, type2, image FROM pokemons GROUP BY name, type, type2, image ORDER BY name"
  );
  return rows;
};

const getPokemonTypes = async () => {
  const { rows } = await pool.query(
    "SELECT type FROM pokemon_types GROUP BY type ORDER BY type"
  );
  return rows;
};

const getTrainers = async () => {
  const { rows } = await pool.query(
    "SELECT name FROM trainers GROUP BY name ORDER BY name"
  );
  return rows;
};

const addPokemon = async (name, type, type2, image) => {
  await pool.query(
    "INSERT INTO pokemons (name, type, type2, image) VALUES ($1, $2, $3, $4)",
    [name, type, type2, image]
  );
};

const addTrainer = async (name) => {
  await pool.query("INSERT INTO trainers (name) VALUES ($1)", [name]);
};

const addPokemonType = async (type) => {
  await pool.query("INSERT INTO pokemon_types (type) VALUES ($1)", [type]);
};

const getPokemonDetails = async (name) => {
  const { rows } = await pool.query(
    "SELECT * FROM pokemons WHERE name = ($1)",
    [name]
  );
  return rows[0];
};

const editPokemon = async (name, type, type2, image) => {
  await pool.query(
    "UPDATE pokemons SET type = ($1),type2 = ($2), image = ($3) WHERE name = ($4)",
    [type, type2, image, name]
  );
};

const getTrainerDetails = async (name) => {
  const { rows } = await pool.query(
    "SELECT COUNT(trainers.name), trainers.name AS trainerName, pokemons.name AS pokemonName, pokemons.type AS pokemonType, pokemons.type2 AS pokemonType2, pokemons.image AS pokemonImage FROM trainers INNER JOIN pokemons ON pokemons.name = trainers.pokemon WHERE trainers.name = ($1) GROUP BY trainers.name, trainers.pokemon, pokemons.name, pokemons.type, pokemons.type2, pokemons.image",
    [name]
  );
  return rows;
};

const addPokemonToTrainer = async (name, pokemonName) => {
  await pool.query("INSERT INTO trainers (name, pokemon) VALUES ($1, $2)", [
    name,
    pokemonName,
  ]);
};

const editTrainer = async (name, newName) => {
  await pool.query("UPDATE trainers SET name = ($1) WHERE name = ($2)", [
    newName,
    name,
  ]);
};

module.exports = {
  getPokemons,
  getPokemonTypes,
  getTrainers,
  addPokemon,
  addTrainer,
  addPokemonType,
  getPokemonDetails,
  editPokemon,
  getTrainerDetails,
  addPokemonToTrainer,
  editTrainer,
};
