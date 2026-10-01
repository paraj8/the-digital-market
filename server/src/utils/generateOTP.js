const crypto = require("crypto");

const generateOTP = () =>
  crypto.randomInt(0, 1000000).toString().padStart(6, "0");

module.exports = generateOTP;