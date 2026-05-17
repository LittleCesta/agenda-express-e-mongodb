import validator from "validator";

export default class CriarContato {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const nameInput = el.querySelector("input[name='nome']");
    const undernameInput = el.querySelector("input[name='sobrenome']");
    const emailInput = el.querySelector("input[name='email']");
    const telInput = el.querySelector("input[name='telefone']");
    let errors = [];

    if (nameInput.value.length < 3 || nameInput.value.length > 50) {
      errors.push("O nome deve ter entre 3 e 50 caracteres");
    }

    if (undernameInput.value.length < 3 || undernameInput.value.length > 50) {
      errors.push("O sobrenome deve ter entre 3 e 50 caracteres");
    }

    if (!validator.isEmail(emailInput.value)) {
      errors.push("E-mail inválido");
    }

    if (!validator.isMobilePhone(telInput.value, "pt-BR")) {
      errors.push("Telefone inválido");
    }

    if (errors.length > 0) {
      e.preventDefault(); // só bloqueia se tiver erro
      alert(errors.join("\n"));
    }

    if (errors.length === 0) {
      el.submit();
    }
  }
}
