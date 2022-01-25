require("dotenv").config(); //para trabajar con las variables de entorno, instalarlo.
const { Sequelize } = require("sequelize");
const fs = require("fs"); //file system, viene con Windows, sin necesidad de instalarlo
const path = require("path"); //file system, viene con Windows, sin necesidad de instalarlo
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env; //debo crear el archivo .env

const sequelize = new Sequelize(
  `postgres://lfeeldexjfbkxs:ab3dd0f703b8da5f6d34daa790b3a9f60efe3ed19a0fdc61f1b9af40522ded0f@ec2-3-216-113-109.compute-1.amazonaws.com/clinicbodycenter`,
  {
    logging: false, 
    native: false, 
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize)); 

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};