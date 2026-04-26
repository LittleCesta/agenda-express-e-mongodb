const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    // garantindo que o objeto body tenha apenas os campos email e password
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    const userExists = await this.userExists();
    if (userExists) return;

    const salt = bcryptjs.genSaltSync(); // Gerando um salt para a senha
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    try {
      this.user = await LoginModel.create(this.body);
    } catch (error) {
      console.error(error);
    }
  }

  async userExists() {
    try {
      const user = await LoginModel.findOne({ email: this.body.email });
      if (user) {
        this.errors.push("Usuário já existe");
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  }

  validate() {
    this.cleanUp();
    // Validação dos campos preenchidos
    // Email precisa ser válido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido");
    }
    // Senha precisa conter letras e números(6 e 12 caracteres)
    if (this.body.password.length < 6 || this.body.password.length > 12) {
      this.errors.push("A senha precisa ter entre 6 e 12 caracteres");
    }
  }
}

module.exports = Login;
