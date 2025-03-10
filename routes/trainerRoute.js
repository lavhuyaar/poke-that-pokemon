const { Router } = require("express");
const trainerController = require("../controllers/trainerController");

const trainerRoute = Router();

trainerRoute.get("/", trainerController.getAllTrainers);

module.exports = trainerRoute;
