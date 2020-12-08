const { Router } = require("express");
const UserController = require("../controllers/authController");

const router = Router();

router.post("/login", UserController.login);

router.get("/profile", UserController.getProfile);
router.get("/sigup", UserController.sigup);

module.exports = router;
