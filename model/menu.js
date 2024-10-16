var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    details: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: ''
    },
    ingredients_id: {
        type: String,
        default: ''
    },
    food_type_id: {
        type: String,
        default: ''
    },
    cuisine_id: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    
}, { timestamps: true });
var menu = new mongoose.model('Menu', schema);
module.exports = menu;