const JWT = require("jsonwebtoken");
require("dotenv").config();

const getToken = (user) => {
  try {
    return JWT.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
  } catch (err) {
    console.error(err);
  }
};

const verifyToken = (token) => {
  try {
    const user = JWT.verify(token, process.env.JWT_SECRET_KEY);
    return user;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getToken,
  verifyToken,
};
