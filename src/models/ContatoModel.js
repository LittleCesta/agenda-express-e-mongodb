const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: { type: String, default: "" },
  email: { type: String, default: "" },
  telefone: { type: String, default: "" },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.validate();
  if (this.errors.length > 0) return;
  this.contato = new ContatoModel(this.body);
  return this.contato.save();
};

Contato.prototype.validate = function () {
  this.cleanUp();
  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.errors.push("E-mail inválido");
  }
  if (!this.body.nome) {
    this.errors.push("Nome é um campo obrigatório");
  }
  if (!this.body.email && !this.body.telefone) {
    this.errors.push(
      "É necessário enviar pelo menos um contato: e-mail ou telefone",
    );
  }
};

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  // garantindo que o objeto body tenha apenas os campos email e password
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};

Contato.prototype.edit = async function (id) {
  if (typeof id !== "string") return;
  this.validate();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
  return this.contato;
};

// Métodos estáticos - Não vão para o prototype e não
// tem acesso a palavra this
Contato.buscaPorId = async function (id) {
  if (typeof id !== "string") return;
  const contato = await ContatoModel.findById(id);
  return contato;
};

Contato.buscaContatos = async function () {
  // Busca todos os contatos(.find()).
  // Organiza os contatos por criado em(.sort({criadoEm: -1})).
  // O -1 serve para organizar os contatos em ordem decrescente
  const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
  return contatos;
};

Contato.delete = async function (id) {
  if (typeof id !== "string") return;
  const contato = await ContatoModel.findOneAndDelete({ _id: id });
  return contato;
};

module.exports = Contato;
