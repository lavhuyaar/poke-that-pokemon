require("dotenv").config();
const { Client } = require("pg");

//SQL create tables
const SQL = `
      CREATE TABLE IF NOT EXISTS pokemons (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR (255), type VARCHAR (255), type2 VARCHAR(255), image CHAR(500));
      CREATE TABLE IF NOT EXISTS trainers (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR (255), pokemon VARCHAR (255));
      CREATE TABLE IF NOT EXISTS pokemon_types (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, type VARCHAR (255));

      INSERT INTO pokemons (name, type, type2, image) VALUES ('Charizard', 'Fire', 'Flying', 'https://titancards.co.uk/blogs/news/all-the-charizard-cards-in-the-pokemon-tcg');

      INSERT INTO pokemons (name, type, image) VALUES ('Pikachu', 'Electric', 'https://cdn.sortiraparis.com/images/80/66131/1025167-pokemon-presents-date-heure-attentes-tout-ce-que-vous-devez-savoir-sur-l-evenement.jpg');

      INSERT INTO pokemons (name, type, image) VALUES ('Sceptile', 'Grass', 'https://static.wikia.nocookie.net/pokemon/images/a/a5/XY132_5.png/revision/latest?cb=20161005121602');

      INSERT INTO trainers (name, pokemon) VALUES ('Ash Ketchum', 'Pikachu'), ('Ash Ketchum', 'Charizard'), ('Ash Ketchum', 'Sceptile');

      INSERT INTO pokemon_types (type) VALUES ('Fire'), ('Water'), ('Grass'), ('Electric'), ('Ghost'), ('Dark'), ('Normal'), ('Flying'), ('Dragon');
`;

const main = async () => {
  console.log("loading...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done...");
};

main();
