// app.get("/getTags", getTags);
// app.post("/addTag", addTag);
// app.put("/updateTag", updateTag);

const express = require("express");
const { getTags, addTag, updateTag } = require("../controllers/tags");
const router = express.Router();

router.get("/", getTags);
router.post("/", addTag);
router.patch("/", updateTag);

module.exports = router;
