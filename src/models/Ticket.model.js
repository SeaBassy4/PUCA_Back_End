const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  idOrden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orden",
    required: [true, "La orden es obligatoria"],
  },
  telefonoCliente: {
    type: String,
    required: [true, "El teléfono del cliente es obligatorio"],
  },
  pdfLink: {
    type: String,
    required: [true, "El link del PDF es obligatorio"],
  },
});

module.exports = mongoose.model("Ticket", TicketSchema, "Ticket");
