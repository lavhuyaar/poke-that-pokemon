const { Router } = require("express");
const trainerController = require("../controllers/trainerController");

const trainerRoute = Router();

trainerRoute.get("/", trainerController.getAllTrainers);
trainerRoute.post("/add", trainerController.createTrainer);

module.exports = trainerRoute;
