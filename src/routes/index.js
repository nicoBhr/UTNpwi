const { Router } = require("express");
const { Cliente } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/ingreso", async (req, res) => {
  const { nombre, apellido, telefono, email, tratamiento } = req.body;
  console.log(nombre);
  console.log(apellido);
  console.log(telefono);
  console.log(email);
  console.log(tratamiento);
  if (nombre && apellido && telefono && email && tratamiento) {
    try {
      let clienteNuevo = await Cliente.create({
        nombre,
        apellido,
        telefono,
        email,
        tratamiento,
      });
      console.log(clienteNuevo);

      if (clienteNuevo) {
        res.status(200).send({ clienteNuevo });
      } else {
        res
          .status(400)
          .json({ message: "Error" });
      }
    } catch (e) {
      console.log("error");
      res.status(400).send(e);
    }
  } else {
    res.status(400).json({
      message: "Error: falta ingresar uno o más datos obligatorios",
    });
  }
});
module.exports = router;