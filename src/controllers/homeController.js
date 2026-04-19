const HomeModel = require("../models/HomeModel");

exports.index = async (req, res) => {
  try {
    res.render("index");
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao buscar dados");
  }
};
