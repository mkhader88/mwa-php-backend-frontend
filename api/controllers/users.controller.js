const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const register = function (req, res) {
    console.log("User AddOne request");
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        console.log(hash);
        const newUser = {
            name: req.body.name, username: req.body.username, password: hash
        };
        User.create(newUser)
            .then(function (user) {
                const response = { status: 201, message: user };
                res.status(response.status).json(response.message);
            })
            .catch( (err) =>_handleError(err,res));
    })
}

const login = function (req, res) {
    console.log(req.body.username);
    User.find({ $text : { $search : req.body.username }})
        .then(function(data) {
            if (data[0] !== undefined) {
                var user = data[0];
                //Check Password
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    // Create token
                    const token = jwt.sign(
                        { user_id: user._id},
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "2h",
                        }
                    );

                    res.status(200).json({username:user.username,token:token});
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