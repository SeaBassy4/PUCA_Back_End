const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    idCategoria: {
        type: mongoose.Schema.Types.ObjectId,
        referencia: "Categoria",
        required: [true, "Debe llevar categoria"]
        
    },
    
    nombre: {
        type: mongoose.Schema.Types.String,
        required: [true, "Debe llevar nombre"],
    }
})