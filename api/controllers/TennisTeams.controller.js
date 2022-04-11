const mongoose = require("mongoose");
const Team = mongoose.model(process.env.TEAM_MODEL);
const getAll = function (req, res) {

    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "QueryString Offset and Count should be numbers" });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
        return;
    }


    Team.find().skip(offset).limit(count).exec(function (err, teams) {
        if (err) {
            console.log("Error finding teams");
            res.status(500).json(err);
        } else {
            console.log("Found teams", teams.length);
            res.status(200).json(teams);
        }
    });
}
const getOne = function (req, res) {
    const teamId = req.params.teamId;
    Team.findById(teamId).exec(function (err, team) {
        const response = {
            status: 200,
            message: team
        };
      if (!team) {
            console.log("team id not found");
            response.status = 404;
            response.message = { "message": "Team ID not found" };
        }
        res.status(response.status).json(response.message);
    });
}
const addOne = function (req, res) {
    console.log("Team AddOne request");
    console.log(req.body);
    const newTeam = {
        country: req.body.country, color: req.body.color, year: req.body.year, reviews: []
    };
    Team.create(newTeam, function (err, team) {
        const response = { status: 201, message: team };
        if (err) {
            console.log("Error creating team");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
const updateOne = function (req, res) {
    console.log("Team UpdateOne request");
    const teamId = req.params.teamId;
    Team.findByIdAndUpdate(teamId,{
        country:req.body.country,
        color:req.body.color,
        year:req.body.year
    },{new:true}).exec(function (err, team) {
        const response = {
            status: 200,
            message: team
        };
        if (err) {
            console.log("Error finding team");
            response.status = 500;
            response.message = err;
        } else if (!team) {
            console.log("team id not found");
            response.status = 404;
            response.message = { "message": "Team ID not found" };
        }
        res.status(response.status).json(response.message);

    });
}
const deleteOne = function (req, res) {
    const teamId = req.params.teamId;
    Team.findByIdAndDelete(teamId).exec(function (err, deletedTeam) {
        const response = { status: 204, message: deletedTeam };
        if (err) {
            console.log("Error finding team");
            response.status = 500;
            response.message = err;
        } else if (!deletedTeam) {
            console.log("team id not found");
            response.status = 404;
            response.message = {
                "message": "team ID not found"
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getOne: getOne,
    getAll: getAll,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne
}