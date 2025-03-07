const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    item: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', salesSchema);