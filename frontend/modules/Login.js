import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    const formName = this.form
      .getAttribute("class")
      .split("-")[1]
      .toUpperCase();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      // alert(`FORMULÁRIO DE ${formName} NÃO ENVIADO!`);
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector("input[name='email']");
    const passwordInput = el.querySelector("input[name='password']");
    let errors = [];

    if (!validator.isEmail(emailInput.value)) {
      errors.push("E-mail inválido");
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      errors.push("A senha precisa ter entre 3 e 50 caracteres");
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
