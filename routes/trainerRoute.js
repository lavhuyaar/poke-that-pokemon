const { Router } = require("express");
const trainerController = require("../controllers/trainerController");

const trainerRoute = Router();

trainerRoute.get("/", trainerController.getAllTrainers);
trainerRoute.post("/add", trainerController.createTrainer);
trainerRoute.get('/:name', trainerController.getTrainerDetails);
trainerRoute.post('/:name/addPokemon', trainerController.createPokemonToTrainer);
trainerRoute.post('/:name/edit', trainerController.updateTrainer);

module.exports = trainerRoute;
