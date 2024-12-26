require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  emailService: {
    fromEmail: process.env.EMAIL_FROM,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
  },
};
