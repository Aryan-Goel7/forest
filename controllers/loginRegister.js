const pool = require("../db");
const {
  comparePassword,
  getHashPassword,
} = require("../utils/passEncryptDecypt");
const { getToken } = require("../utils/jsonWebToken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUserQuery = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };

    const existingUser = await pool.query(existingUserQuery);

    if (!existingUser.rows.length) {
      return res.status(404).send({
        success: false,
        message: "User doesn't exist",
      });
    }

    const passwordQuery = {
      text: "SELECT password FROM users WHERE email = $1",
      values: [email],
    };

    const hashPassword = await pool.query(passwordQuery);

    const match = await comparePassword(
      password,
      hashPassword.rows[0].password
    );

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    const uidQuery = {
      text: "SELECT uid,CONCAT(first_name , last_name , role) as NAME ,email  FROM users WHERE email = $1",
      values: [email],
    };

    const userData = (await pool.query(uidQuery)).rows[0];
    console.log(userData);
    const token = getToken(userData);

    // res.cookie("sid", token);
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const registerController = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name) {
    return res.status(404).send({
      success: false,
      message: "First Name can't be empty ",
    });
  }
  if (!last_name) {
    return res.status(404).send({
      success: false,
      message: "Last_name can't be empty ",
    });
  }
  if (!email) {
    return res.status(404).send({
      success: false,
      message: "Email can't be empty.",
    });
  }
  if (!password) {
    return res.status(404).send({
      success: false,
      message: "Password can't be empty",
    });
  }
  if (password.length < 3) {
    res.status(404).send({
      success: false,
      message: "Password should be atleast 8 character.",
    });
  }
  if (password.length > 50) {
    res.status(404).send({
      success: false,
      message: "Password should be at 50 characters.",
    });
  }

  try {
    const existingUserQuery = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };
    const existingUser = await pool.query(existingUserQuery);
    // console.log(existingUser);
    if (existingUser.rowCount > 0) {
      return res.status(200).send({
        success: true,
        message: "User Already exist",
      });
    } else {
      const hashPassword = await getHashPassword(password);
      const addUserQuery = {
        text: "INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
        values: [first_name, last_name, email, hashPassword],
      };
      await pool.query(addUserQuery);
      res.status(200).send({
        success: true,
        message: "Register Successful",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(501).send({
      success: false,
      message: "Error in server",
      err,
    });
  }
};

module.exports = {
  loginController,
  registerController,
};
