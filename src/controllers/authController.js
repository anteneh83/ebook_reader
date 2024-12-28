const User = require('../models/User');
const sendEmailNotification = require('../services/emailService'); // Email service for sending verification emails

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      username,
      email: normalizedEmail,
      password, 
      role: role || 'user',
    });

    const savedUser = await newUser.save();

    const subject = 'Welcome to Our eBook Platform!';
    const text = `Hello ${savedUser.username},\n\nThank you for registering on our eBook platform. We are excited to have you onboard! Feel free to browse and enjoy our collection of eBooks.\n\nBest regards,\nThe eBook Platform Team`;

    await sendEmailNotification(savedUser.email, subject, text);

    res.status(201).json({message: 'User registered successfully.'});
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};
