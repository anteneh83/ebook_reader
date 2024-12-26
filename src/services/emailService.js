const nodemailer = require('nodemailer');
const { emailService } = require('../config/config');

const transporter = nodemailer.createTransport({
  host: emailService.smtpHost,
  port: emailService.smtpPort,
  secure: true,
  auth: {
    user: emailService.smtpUser,
    pass: emailService.smtpPass,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const verificationUrl = `https://ebook-reader.onrender.com/verify-email?token=${token}`;

  const mailOptions = {
    from: emailService.fromEmail,
    to: email,
    subject: 'Please verify your email address',
    text: `Please click on the following link to verify your email address: ${verificationUrl}`,
    html: `<p>Please click on the following <a href="${verificationUrl}">link</a> to verify your email address.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

