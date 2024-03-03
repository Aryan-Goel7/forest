const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/loginRegister");
// const { authenicateUser } = require("../middleware/Auth");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.status(201).send({
      success: true,
      message: "Auth Successful",
    });
  } catch (err) {
    console.error(err);
  }
});
router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
