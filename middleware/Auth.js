const { verifyToken } = require("../utils/jsonWebToken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    // res.redirect("/login");
    res.status(410).send({
      success: true,
      message: "No token Found.",
    });
    return;
  }
  const user = verifyToken(token);
  if (!user) {
    // res.redirect("/register");
    res.status(410).send({
      success: true,
      message: "User not Validated.",
    });
    return;
  }
  req.body.user = {
    name: user.name,
    email: user.email,
    uid: user.uid,
    role: user.role,
  };
  next();
  return;
};

module.exports = {
  authenticateUser,
};
