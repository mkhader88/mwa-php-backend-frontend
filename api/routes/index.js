const express= require("express");
const router= express.Router();
const teamsController= require("../controllers/TennisTeams.controller");
const playersController= require("../controllers/players.controller");

router.route("/teams")
.post(teamsController.addOne)
.get(teamsController.getAll);
router.route("/teams/:teamId")
.delete(teamsController.deleteOne)
.put(teamsController.updateOne)
.get(teamsController.getOne);
router.route("/teams/:teamId/players")
.post(playersController.addOne)
.get(playersController.getAll);
router.route("/teams/:teamId/players/:playerId")
.put(playersController.updateOne)
.delete(playersController.deleteOne)
.get(playersController.getOne);



module.exports = router;