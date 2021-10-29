const { Router } = require("express");
const router = Router();

//Controller methods
const coreMemberController = require("../../controllers/Core Members/coreMemberController");

//Api Route
router.post("/api/coremember", coreMemberController.coreMember_post);

//Export router
module.exports = router;

/*************************************************************/