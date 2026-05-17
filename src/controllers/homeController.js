const Contato = require("../models/ContatoModel");
exports.index = async (req, res) => {
  try {
    const contatos = await Contato.buscaContatos();
    res.render("index", { contatos });
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao buscar dados");
  }
};
