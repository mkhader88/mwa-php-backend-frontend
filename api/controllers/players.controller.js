const mongoose = require("mongoose");
const team = mongoose.model(process.env.TEAM_MODEL);
const getAll = function (req, res) {
    console.log("GET players Controller");
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec(function (err, team) {
        if (err) {
            console.log("Error finding teams");
            res.status(500).json(err);
        } else {
            console.log("Found players ", team.players, " for team ", team);
            res.status(200).json(team.players);
        }
    });
}
const getOne = function (req, res) {
    console.log("GET One Publisher Controller");
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;
    team.findById(teamId).select("players").exec(function (err, team) {
        if (err) {
            console.log("Error finding teams");
            res.status(500).json(err);
        } else {
            console.log("Found player ", team.players.id(playerId), " for team ", team);
            if (team.players.id(playerId))
                res.status(200).json(team.players.id(playerId));
            else
                res.status(404).json({message:"Player not found"});
        }
    });
}

const addOne = function (req, res) {
    console.log("Add One player Controller");
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec(function (err, team) {
        console.log("Found team ", team);
        const response = { status: 200, message: team };
        if (err) {
            console.log("Error finding team");
            response.status = 500;
            response.message = err;
        } else if (!team) {
            console.log("Error finding team");
            response.status = 404;
            response.message = { "message": "team ID not found " + teamId };
        }
        if (team) {
            _addPlayer(req, res, team);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}
const _addPlayer = function (req, res, team) {
    let player = {
        name: req.body.name,
        age: req.body.age
    };
    team.players[team.players.length] = player;
    team.save(function (err, updatedTeam) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedTeam.players;
        }
        res.status(response.status).json(response.message);
    });
}

const updateOne = function (req, res) {
    console.log("Update One player Controller");
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec(function (err, team) {
        console.log("Found team ", team);
        const response = { status: 200, message: team };
        if (err) {
            console.log("Error finding team");
            response.status = 500;
            response.message = err;
        } else if (!team) {
            console.log("Error finding team");
            response.status = 404;
            response.message = { "message": "team ID not found " + teamId };
        }
        if (team) {
            _updatePlayer(req, res, team);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _updatePlayer = function (req, res, team) {
    const playerId = req.params.playerId;
    if(team.players.id(playerId)){
        if(req.body.name)
            team.players.id(playerId).name = req.body.name;
        if(req.body.age)
            team.players.id(playerId).age = req.body.age;
            
        team.save(function (err, updatedTeam) {
            const response = { status: 200, message: [] };
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.status = 201;
                response.message = updatedTeam.players.id(playerId);
            }
            res.status(response.status).json(response.message);
        });
    } else {
        res.status(404).json({ message: "Player Not Found" });
    }

}

const deleteOne = function (req, res) {
    console.log("Delete One player Controller");
    const teamId = req.params.teamId;
    team.findById(teamId).select("players").exec(function (err, team) {
        //console.log("Found team ", team);
        const response = { status: 200, message: team };
        if (err) {
            console.log("Error finding team");
            response.status = 500;
            response.message = err;
        } else if (!team) {
            console.log("Error finding team");
            response.status = 404;
            response.message = { "message": "team ID not found " + teamId };
        }
        if (team) {
            _deletePlayer(req, res, team);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _deletePlayer = function (req, res, team) {
    const playerId = req.params.playerId;
    if (team.players.id(playerId)) {
        team.players.id(playerId).remove();

        team.save(function (err, updatedTeam) {
            const response = { status: 200, message: [] };
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.status = 201;
                response.message = updatedTeam.players;
            }
            res.status(response.status).json(response.message);
        });
    } else {
        res.status(404).json({ message: "Player Not Found" });
    }
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne
}