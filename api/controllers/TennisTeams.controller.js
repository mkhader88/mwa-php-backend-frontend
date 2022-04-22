const mongoose = require("mongoose");
const Team = mongoose.model(process.env.TEAM_MODEL);
const jwt = require('jsonwebtoken');
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


    Team.find().skip(offset).limit(count).exec()
        .then((teams)=>_getAllResult(teams,res))
        .catch((err) => _handleError(err));
}

const findAll = function (req, res) {

    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }
    let searchString='';
    if (req.query && req.query.search) {
        searchString = req.query.search;
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "QueryString Offset and Count should be numbers" });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
        return;
    }

    Team.find({ $text : { $search : searchString }}).skip(offset).limit(count).exec()
        .then((teams)=>_getAllResult(teams,res))
        .catch((err) => _handleError(err));
}

const _getAllResult=function (teams,res) {
    console.log("Found teams", teams.length);
    res.status(200).json(teams);
}

const getOne = function (req, res) {
    const teamId = req.params.teamId;
    Team.findById(teamId).exec()
        .then((team) => _getOneResult(team,res))
        .catch((err) => _handleError(err));
}

const _getOneResult = function (team,res) {
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
}
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
const addOne = function (req, res) {
    console.log("Team AddOne request");
    //validating the token
    _validateToken(req, res);
    console.log(req.body);
    const newTeam = {
        country: req.body.country, color: req.body.color, year: req.body.year, reviews: []
    };
    Team.create(newTeam)
        .then(function (team) {
            const response = { status: 201, message: team };
            res.status(response.status).json(response.message);
        })
        .catch( (err) =>_handleError(err,res));
}
const updateOne = function (req, res) {
    console.log("Team UpdateOne request");
    //validating the token
    _validateToken(req, res);
    const teamId = req.params.teamId;

    Team.findByIdAndUpdate(teamId,{
        country:req.body.country,
        color:req.body.color,
        year:req.body.year
    },{new:true}).exec()
        .then((team) => _updateSuccessResult(team,res))
        .catch((err) => _handleError(err,res));
}
const _handleError = function (err,res){
    console.log("Handle Error Called");
    res.status(500).json(err);
}
const _updateSuccessResult = function (team,res){
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
}
const deleteOne = function (req, res) {
    //validating the token
    _validateToken(req, res);
    const teamId = req.params.teamId;
    Team.findByIdAndDelete(teamId).exec()
        .then((deletedTeam) => _deleteSuccessResult(deletedTeam,res))
        .catch((err) => _handleError(err,res));
}
const _deleteSuccessResult = function (deletedTeam,res){
    const response = { status: 204, message: deletedTeam };
    if (!deletedTeam) {
        console.log("team id not found");
        response.status = 404;
        response.message = {
            "message": "team ID not found"
        };
    }
    res.status(response.status).json(response.message);

}
module.exports = {
    getOne: getOne,
    getAll: getAll,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne,
    findAll: findAll
}