const { Router } = require("express");
const UserController = require("../controllers/authController");

const router = Router();

router.post("/login", UserController.login);

router.get("/profile", UserController.getProfile);
router.get("/search", UserController.search);
router.get("/addFriend/:id", UserController.addFriend);
router.get("/getListMess/:id", UserController.getListMess);

module.exports = router;
