// Correção par o caso do navegador não suportar
// o regenerator run-time por ser antigo
// import "regenerator-runtime/runtime";

// Correção para o caso do navegador nao suportar
// o async/await por ser antigo
// import "core-js/stable";

import "core-js/stable";
import "regenerator-runtime/runtime";

import Login from "./modules/Login.js";
import CriarContato from "./modules/CriarContato.js";

const login = new Login(".form-login");
const cadastro = new Login(".form-cadastro");

const criarContato = new CriarContato(".form-contato");

login.init();
cadastro.init();

criarContato.init();

// import './assets/css/style.css';
