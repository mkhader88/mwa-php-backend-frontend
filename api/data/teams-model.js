const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});


const teamSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    players: [playerSchema]
});
const Team = mongoose.model("Team", teamSchema, "Teams");