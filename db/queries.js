const pool = require('./pool');


//Queries

const getPokemons = async () => {
    const {rows} = await pool.query('SELECT * FROM pokemons');
    return rows;
}

const getPokemonTypes = async () => {
    const {rows} = await pool.query('SELECT * FROM pokemon_types');
    return rows;
}

const getTrainers = async () => {
    const {rows} = await pool.query('SELECT name FROM trainers GROUP BY name ORDER BY name');
    return rows;
}

module.exports = {
    getPokemons, getPokemonTypes, getTrainers
}