var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ''
    },
}, { timestamps: true });
var ingredients = new mongoose.model('Ingredients', schema);
module.exports = ingredients;