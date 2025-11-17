const { jsPDF } = require("jspdf");
const fs = require("fs");

const enviarTicketWhatsapp = (req, res) => {
  try {
    const { orden, detalleOrdenes, celular } = req.body;

    //generamos pdf

    const pdf = new jsPDF({
      unit: "pt",
      format: "a6", // Tamaño tipo ticket
    });

    let y = 30;

    pdf.setFontSize(14);
    pdf.text("Cafetería “Bendita Patria”", 20, y);
    y += 25;

    pdf.setFontSize(10);
    pdf.text("Transacción realizada en la siguiente fecha y hora:", 20, y);
    y += 20;

    const fecha = new Date(orden.fechaHora).toLocaleString("es-MX");
    pdf.text(fecha, 20, y);
    y += 20;

    pdf.line(20, y, 250, y);
    y += 20;

    pdf.text(`Orden: ${orden._id}`, 20, y);
    y += 20;

    // ITEMS
    detalleOrdenes.forEach((item) => {
      const nombre = item.idProducto.nombre;
      const tamano = item.idTamaño.nombre;
      const cantidad = item.cantidad;
      const precio = (
        item.precioUnitario * cantidad +
        (item?.idTamaño?.precioExtra || 0) * item.cantidad
      ).toFixed(2);

      pdf.text(`${cantidad}x ${nombre} - ${tamano}`, 20, y);
      pdf.text(precio.toString(), 200, y);
      y += 20;
    });

    y += 10;

    pdf.setFontSize(12);
    pdf.text("TOTAL: " + orden.total.toFixed(2), 20, y, { maxWidth: 200 });
    y += 20;

    pdf.line(20, y, 250, y);
    y += 25;

    pdf.setFontSize(10);
    pdf.text("Paseo de la patria #342, Col. Honor a la Bandera", 20, y);
    y += 20;

    pdf.text(`Enviado a celular: ${celular}`, 20, y);

    // ==========================
    // 2. GUARDAR PDF EN SERVIDOR
    // ==========================

    const filePath = path.join(__dirname, `ticket-${orden._id}.pdf`);
    pdf.save(filePath);

    //enviamos pdf al cliente via whatsapp

    //si todo bien entonces return response ok
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = { enviarTicketWhatsapp };
