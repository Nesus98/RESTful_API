//Importar los modulos express y mongoose
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//Obtener la informacion el archivo env
require("dotenv").config();
//Almacenar la cadena de conexion
const mongoString = process.env.DATABASE_URL;

//Conectar con la base de datos
mongoose.connect(mongoString, { useNewUrlParser: true });
//Guardar la conexion
const db = mongoose.connection;
//Verificar si la conexion ha sido exitosa
db.on("error", (error) => {
  console.log(error);
});
// Se ejecuta una unica vez, cuando se conecta a la base de datos, en lugar de en cada peticion
db.once("connected", () => {
  console.log("succesfully connected");
});
//Recibir una notificacion cuando la conexion se haya cerrado
db.on("disconnected", () => {
  console.log("Mongoose default connection is disconnected");
});
//Importacion de controladores
const users = require("./Controller/userController");
const logins = require("./Controller/loginController");

const PORT = 8000;
//Crear la app
const app = express();
//Analizar los archivos json
app.use(express.json());

app.use("/users", users);

app.use("/auth", logins);

app.listen(PORT, () => {
  console.log(`server valid at http://127.0.0.1:${PORT}`);
});
