const pool = require("./pool");

//Queries

const getPokemons = async () => {
  const { rows } = await pool.query("SELECT * FROM pokemons");
  return rows;
};

const getPokemonTypes = async () => {
  const { rows } = await pool.query("SELECT * FROM pokemon_types");
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

module.exports = {
  getPokemons,
  getPokemonTypes,
  getTrainers,
  addPokemon,
  addTrainer,
  addPokemonType
};
