const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const express = require("express")

conn.sync({ force: false }).then(() => {
  server.listen(5432, () => {
    console.log(`Servidor corriendo en el puerto 3001`); 
  });
});

server.use(express.static("./public"))
