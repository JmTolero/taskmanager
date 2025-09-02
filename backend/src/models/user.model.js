const mongoose = require('mongoose');


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
            require: [true,"Please input an username"],
            lowecase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
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