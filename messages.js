const wppconnect = require("@wppconnect-team/wppconnect");
const { jsPDF } = require("jspdf");

let client;

wppconnect
  .create({
    session: "puca-session",
    puppeteerOptions: {
      headless: true,
      args: ["--no-sandbox"],
    },
  })
  .then((c) => {
    client = c;
    console.log("WhatsApp listo");
  })
  .catch((err) => console.error(err));

// Método para enviar ticket
const enviarTicketWhatsapp = async (req, res) => {
  try {
    const { orden, detalleOrdenes, celular } = req.body;

    if (!client) {
      return res.status(500).json({
        ok: false,
        message: "El cliente de WhatsApp aún no está listo",
      });
    }

    // Generar PDF
    const pdf = new jsPDF({ unit: "pt", format: "a6" });
    let y = 30;

    pdf.setFontSize(14);
    pdf.text("Cafetería “Bendita Patria”", 20, y);
    y += 25;

    pdf.setFontSize(10);
    pdf.text("Transacción realizada en:", 20, y);
    y += 20;

    const fecha = new Date(orden.fechaHora).toLocaleString("es-MX");
    pdf.text(fecha, 20, y);
    y += 20;

    pdf.line(20, y, 250, y);
    y += 20;

    pdf.text(`Orden: ${orden._id}`, 20, y);
    y += 20;

    detalleOrdenes.forEach((item) => {
      const nombre = item.idProducto.nombre;
      const tamano = item?.idTamaño?.nombre;
      const cantidad = item.cantidad;
      const precio = (
        item.precioUnitario * cantidad +
        (item?.idTamaño?.precioExtra || 0) * item.cantidad
      ).toFixed(2);

      pdf.text(`${cantidad}x ${nombre} - ${tamano || ""}`, 20, y);
      pdf.text(precio.toString(), 200, y);
      y += 20;
    });

    y += 10;

    pdf.setFontSize(12);
    pdf.text("TOTAL: " + orden.total.toFixed(2), 20, y);
    y += 20;

    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    // Enviar WhatsApp
    await client.sendFile(
      "521" + celular + "@c.us",
      `data:application/pdf;base64,${pdfBuffer.toString("base64")}`,
      `ticket-${orden._id}.pdf`,
      "Aquí tienes tu ticket, gracias por tu compra! ☺️"
    );

    res.json({
      ok: true,
      message: "Ticket enviado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = { enviarTicketWhatsapp };
