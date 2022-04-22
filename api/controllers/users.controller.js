const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL);


const register = function (req, res) {
    console.log("User AddOne request");
    console.log(req.body);
    const newUser = {
        name: req.body.name, username: req.body.username, password: req.body.password
    };
    User.create(newUser)
        .then(function (user) {
            const response = { status: 201, message: user };
            res.status(response.status).json(response.message);
        })
        .catch( (err) =>_handleError(err,res));
}

const login = function (req, res) {
    console.log(req.body.username);
    User.find({ $text : { $search : req.body.username }})
        .then(function(data) {
            if (data[0] !== undefined) {
                var user = data[0];
                //Check Password
                if (req.body.password === user.password) {
                    res.status(200).json(user);
                }else{
                    res.status(403).json({message:"Wrong Username or Password"});
                }
            }else{
                res.status(403).json({message:"Wrong Username or Password"});
            }
        })
        .catch((err) =>_handleError(err,res));
}

const _handleError = function (err,res){
    console.log("Handle Error Called");
    res.status(500).json(err);
}
module.exports = {
    register: register,
    login: login
}