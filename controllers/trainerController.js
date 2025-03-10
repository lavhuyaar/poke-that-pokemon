const db = require("../db/queries");

exports.getAllTrainers = async (req, res) => {
  const trainers = await db.getTrainers();
  console.log(trainers, 'trainer')
  res.render("trainers", {
    title: "Pokemon Trainers",
    trainers: trainers,
  });
};