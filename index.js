const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const express = require("express");
require("dotenv").config();

conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log(`Servidor corriendo en el puerto 3001`); 
  });
});

server.use(express.static("./public"))
