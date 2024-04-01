const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add the password"]
    }
},
    {
        timestamps: true,
    }
);

module.exports= mongoose.model("Users", userSchema);