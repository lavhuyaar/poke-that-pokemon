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
