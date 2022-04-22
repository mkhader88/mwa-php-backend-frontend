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

teamSchema.index({'$**': 'text'});
const Team = mongoose.model(process.env.TEAM_MODEL, teamSchema, process.env.DB_TEAMS_COLLECTION);