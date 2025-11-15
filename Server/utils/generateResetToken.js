const crypto = require("crypto");
const generateResetPasswordToken =  ()=> {
  const resetTokenRaw = crypto.randomBytes(20).toString("hex");

  resetTokenHashed = crypto
    .createHash("sha256")
    .update(resetTokenRaw)
    .digest("hex");

  

  return {resetTokenRaw,resetTokenHashed};
};

module.exports= generateResetPasswordToken;