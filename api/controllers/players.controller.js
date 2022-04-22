const mongoose = require("mongoose");
const team = mongoose.model(process.env.TEAM_MODEL);
const jwt = require('jsonwebtoken');
const _validateToken = function (req, res){
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
    } catch (err) {
        //return res.status(401).send("Invalid Token");
    }
}
const getAll = function (req, res) {
    console.log("GET players Controller");
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec()
        .then((team) => _getAllSuccess(team,res))
        .catch((err) => _handleError(err,res));
}
const _getAllSuccess = function (team,res) {
    console.log("Found players ", team.players, " for team ", team);
    res.status(200).json(team.players);

}
const getOne = function (req, res) {
    console.log("GET One Publisher Controller");
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;
    team.findById(teamId).select("players").exec()
        .then((team) => _getOneSuccess(team,res))
        .catch((err) => _handleError(err,res));
}
const _getOneSuccess = function (team,res) {
    console.log("Found player ", team.players.id(playerId), " for team ", team);
    if (team.players.id(playerId))
        res.status(200).json(team.players.id(playerId));
    else
        res.status(404).json({message:"Player not found"});
}

const addOne = function (req, res) {
    console.log("Add One player Controller");
    //validating the token
    _validateToken(req, res);
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec()
        .then((team) => _addOneSuccess(team,res,req))
        .catch((err) => _handleError(err,res));
}

const _addOneSuccess = function (team,res,req) {
    console.log("Found team ", team);
    const response = { status: 200, message: team };
    if (!team) {
        console.log("Error finding team");
        response.status = 404;
        response.message = { "message": "team ID not found " + teamId };
    }
    if (team) {
        _addPlayer(req, res, team);
    } else {
        res.status(response.status).json(response.message);
    }
}

const _addPlayer = function (req, res, team) {
    if(!req.body.name || !req.body.age){
        res.status(403).json({message:"Please fill all Required fields"});
    }else{
    let player = {
        name: req.body.name,
        age: req.body.age
    };
    team.players[team.players.length] = player;
    team.save()
        .then((team) => _savePlayerSuccess(team,res))
        .catch((err) => _handleError(err,res));
    }
}
const _savePlayerSuccess = function (updatedTeam,res) {
    const response = { status: 201, message: updatedTeam.players };
    res.status(response.status).json(response.message);
}

const updateOne = function (req, res) {
    console.log("Update One player Controller");
    //validating the token
    _validateToken(req, res);
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec()
        .then((team) => _updateOneSuccess(team,res,req))
        .catch((err) => _handleError(err,res));
}

const _updateOneSuccess = function (team,res,req) {
    console.log("Found team ", team);
    const response = { status: 200, message: team };
    if (!team) {
        console.log("Error finding team");
        response.status = 404;
        response.message = { "message": "team ID not found " };
    }
    if (team) {
        _updatePlayer(req, res, team);
    } else {
        res.status(response.status).json(response.message);
    }
}

const _updatePlayer = function (req, res, team) {
    const playerId = req.params.playerId;
    if(team.players.id(playerId)){
        if(req.body.name)
            team.players.id(playerId).name = req.body.name;
        if(req.body.age)
            team.players.id(playerId).age = req.body.age;
            
        team.save()
            .then((team) => _savePlayerSuccess(team,res))
            .catch((err) => _handleError(err,res));
    } else {
        res.status(404).json({ message: "Player Not Found" });
    }

}

const deleteOne = function (req, res) {
    console.log("Delete One player Controller");
    //validating the token
    _validateToken(req, res);
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec()
        .then((team)=>_deleteOneSuccess(team,res,req))
        .catch((err) => _handleError(err,res));
}

const _deleteOneSuccess = function (team,res,req) {
    //console.log("Found team ", team);
    const response = { status: 200, message: team };
    if (!team) {
        console.log("Error finding team");
        response.status = 404;
        response.message = { "message": "team ID not found " };
    }
    if (team) {
        _deletePlayer(req, res, team);
    } else {
        res.status(response.status).json(response.message);
    }
}

const _deletePlayer = function (req, res, team) {
    const playerId = req.params.playerId;
    if (team.players.id(playerId)) {
        team.players.id(playerId).remove();

        team.save()
            .then((team) => _savePlayerSuccess(team,res))
            .catch((err) => _handleError(err,res));
    } else {
        res.status(404).json({ message: "Player Not Found" });
    }
}
const _handleError = function (err,res){
    console.log("Handle Error Called");
    res.status(500).json(err);
}
module.exports = {
    getAll: getAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne
}