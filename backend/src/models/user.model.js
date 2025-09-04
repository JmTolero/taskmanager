const mongoose = require('mongoose');
const dbconfig = require('../config/db.config')

const userSchema = mongoose.Schema(
    
    {
        name: {
            type: String,
            require: [true,"Please input a name"],
            trim:true,
            minlength: 2,
            maxlength: 70
        },
        username: {
            type: String,
            require: [true,"Please input an username using email"],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            trim: true,
            require: [true,"Please input a password"],
            minlength: 6
        }
    },

    {
        timestamps : true
    }

);

module.exports = mongoose.model("User", userSchema);