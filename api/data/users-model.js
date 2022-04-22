const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true // `username` must be unique
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.index({'$**': 'text'});
mongoose.model(process.env.USER_MODEL, userSchema, process.env.DB_USERS_COLLECTION);