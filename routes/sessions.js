// app.get("/getSession", getSession);
// app.post("/addSession", addSession);

const express = require("express");
const { getSession, addSession } = require("../controllers/sessions");

const router = express.Router();

router.get("/", getSession);
router.post("/", addSession);

module.exports = router;
