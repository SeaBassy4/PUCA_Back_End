const Ticket = require('../models/Ticket.model');
const Orden = require('../models/Orden.model');

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate("idOrden");
        res.status(200).json(tickets);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

const getTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id).populate("idOrden");
        if (!ticket) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postTicket = async (req, res) => {
    try {
        const { idOrden, telefonoCliente, pdfLink } = req.body;
        const nuevoTicket = new getGabinete({ idOrden, telefonoCliente, pdfLink });
        await nuevoTicket.save();

        res.status(201).json({
            ok: true,
            message: "Ticket creado existosamente",
            data: nuevoGabinete,
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

const putTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { idOrden, telefonoCliente, pdfLink } = req.body;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { idOrden, telefonoCliente, pdfLink },
            { new: true }
        ).populate("idOrden");

        if (!updatedTicket) {
            return res
                .status(404)
                .json({ ok: false, message: "Ticket no encontrado" });
        }
        
        res.status(200).json({
            ok: true,
            message: "Ticket actualizado exitosamente",
            data: updatedTicket,
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }        
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticketEliminado = await Ticket.findByIdAndDelete(id);
        if (!ticketEliminado) {
            return res
            .status(404)
            .json({ ok: false, message: "Ticket no encontrado" });
        }

        res.status(200).json({
            ok: true,
            message: "Ticket eliminado exitosamente",
            data: deletedTicket,
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports = {
    getTickets,
    getTicket,
    postTicket,
    putTicket,
    deleteTicket,
};