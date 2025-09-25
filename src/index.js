require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// importamos rutas

const categoriaRoutes = require("./routes/categoria.route");
const productoRoutes = require("./routes/producto.route");
const usuarioRoutes = require("./routes/usuario.route");
const ordenRoutes = require("./routes/orden.route");
const detalleOrdenRoutes = require("./routes/detalleOrden.route");
const tamañoRoutes = require("./routes/tamaño.route");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/detalle-ordenes", detalleOrdenRoutes);
app.use("/api/tamanos", tamañoRoutes);

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB ✅"))
  .catch((err) => console.log("Error MongoDB:", err));

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
