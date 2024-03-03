const express = require("express");
const tagRouter = require("./routes/tags");
const sessionRouter = require("./routes/sessions");
const { authenticateUser } = require("./middleware/Auth");
const router = express.Router();

// router.use(authenticateUser);
router.use("/tags", tagRouter);
router.use("/sessions", sessionRouter);

module.exports = router;
