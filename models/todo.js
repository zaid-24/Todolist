const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
});

const todoModel  = mongoose.model("Todo", todoSchema);

module.exports = todoModel;