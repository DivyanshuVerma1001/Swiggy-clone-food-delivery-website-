function generateEmailTemplate(verificationCode) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ff9800; border-radius: 10px; background-color: #fffaf3;">
      
      <!-- Header -->
      <h2 style="color: #ff9800; text-align: center; margin-bottom: 10px;">
        🍴 Verify Your Email
      </h2>
      <p style="font-size: 16px; color: #333; text-align: center;">
        Welcome to <span style="color:#e53935; font-weight:bold;">FoodExpress</span>!
      </p>

      <!-- Verification Code Box -->
      <p style="font-size: 16px; color: #333; margin-top: 20px;">
        Dear User,
      </p>
      <p style="font-size: 16px; color: #333;">
        Use the following verification code to confirm your email:
      </p>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 26px; font-weight: bold; color: #ffffff; padding: 12px 30px; border-radius: 6px; background: linear-gradient(135deg, #ff9800, #f57c00); box-shadow: 0px 3px 6px rgba(0,0,0,0.15);">
          ${verificationCode}
        </span>
      </div>

      <!-- Expiry Warning -->
      <p style="font-size: 15px; color: #333;">
        ⚠️ This code will expire in 
        <span style="color:#e53935; font-weight:bold;">10 minutes</span>.
      </p>
      <p style="font-size: 15px; color: #333;">
        If you did not request this, please ignore this email.
      </p>

      <!-- Footer -->
      <footer style="margin-top: 25px; text-align: center; font-size: 14px; color: #666;">
        <p style="margin: 0;">Thank you for choosing <span style="color:#43a047; font-weight:bold;">FoodExpress</span> 🍕</p>
        <p style="font-size: 12px; color: #999; margin-top: 8px;">
          This is an automated message. Please do not reply.
        </p>
      </footer>
    </div>
  `;
}

module.exports = generateEmailTemplate;
