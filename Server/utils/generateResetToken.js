const crypto = require("crypto");
const generateResetPasswordToken =  ()=> {
  const resetToken = crypto.randomBytes(20).toString("hex");

  resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  

  return resetPasswordToken;
};

module.exports= generateResetPasswordToken;