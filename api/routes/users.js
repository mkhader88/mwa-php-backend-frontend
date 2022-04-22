const express= require("express");
const router= express.Router();
const usersController= require("../controllers/users.controller");

router.route("/register")
.post(usersController.register)




module.exports = router;