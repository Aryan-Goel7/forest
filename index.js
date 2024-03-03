const express = require("express");
require("dotenv").config();
const server = require("./server");
const { authenticateUser } = require("./middleware/Auth");
const app = express();
app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.use("/api/v1/", authenticateUser, server);

app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
