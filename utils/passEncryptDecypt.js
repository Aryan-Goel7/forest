const bcrypt = require("bcrypt");

const getHashPassword = async (password, saltRounds = 10) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = {
  getHashPassword,
  comparePassword,
};
