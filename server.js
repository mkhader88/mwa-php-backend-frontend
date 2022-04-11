require("dotenv").config();
require("./api/data/db.js");
const express = require("express");
const path = require("path");
const routes= require("./api/routes");
const app=express();
app.use(express.json());
app.use(express.urlencoded());

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
    });

app.use(express.static(path.join(__dirname,"public")));

app.use("/api", routes);

const server = app.listen(process.env.PORT,function(){
    console.log("Listening to port",server.address().port);

});
