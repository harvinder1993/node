var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    phone: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'chef'], 
        default: 'user'
    }
    }, { timestamps: true });

    schema.pre('save', async function(next) {
        try {
            if (this.isModified('password') || this.isNew) {
                // Hash the password
                this.password = await bcrypt.hash(this.password, 10);
            }
            next();  // Continue with save
        } catch (error) {
            console.log("ddddddddddddd");
            return false;
            next(error);  // Pass error to the next middleware
        }
    });
var user = new mongoose.model('User', schema);
module.exports = user;