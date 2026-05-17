// Importando o módulo path do Node.js.
// Essa forma de importar é o CommonJS
const path = require("path");

// Os módulos possuem um "ambiente" próprio e se
// não forem exportados explicitamente, eles não
// podem ser usados fora do arquivo onde são criados.
module.exports = {
  mode: "development", // Definindo o modo desenvolvimento, por ser um modo para testar, ele é mais rápido de buildar
  entry: "./frontend/main.js", // Arquivo de entrada. Arquivo usado para criar o bundle
  output: {
    path: path.resolve(__dirname, "public", "assets", "js"), // Arquivo de saída. Arquivo gerado pelo webpack
    filename: "bundle.js", // Nome do arquivo...
  },
  module: {
    // Regras utilizadas pelo webpack. Esse é um arraye de objetos e como no momento só estamos trabalhando
    // com js, só vai haver um obj relacionado a js
    rules: [
      {
        exclude: /node_modules/, // Excluindo os arquivos da pasta node_modules
        test: /\.js$/, // Testando qual arquivo vai ser analisado. Na verdade, aqui nesse caso ele vai validar se a extensão é js
        // Tanto test quanto exclude aceitam expressões regulares. Estamos escapando o "." por que em expressões regulares, ele tem um papel específico e nesse caso não queremos que ele assuma esse papel, apenas que ele seja interpretado como um "." mesmo
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // Como utilizamos o babel e o webpack para criar um
  // arquivo unico com todos os arquivos da aplicação, fica inviável as vezes
  // encontrar algum log ou erro que ocorre na aplicação. Com o devtoll: 'source-map',
  // nós criamos um mapeamento para que fique mais fácil de descobrir onde o erro ocorreu.
  devtool: "source-map",
};
