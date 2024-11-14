// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'mohamednihmath13@gmail.com',
    pass: 'fijqjkumbihftoju',
  },
});

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');

  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
  await user.save();

  const mailOptions = {
    to: user.email,
    from: 'mohamednihmath13@gmail.com',
    subject: 'Password Reset',
    text: `You requested a password reset. Click this link to reset your password: http://localhost:5173/reset-password/${token}`,
  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err){
        console.error('Error sending email:', err);
    return res.status(500).send('Error sending email');
    }
    res.status(200).send('Password reset email sent');
  });
};

const resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
  
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, 'secret');
      } catch (err) {
        return res.status(400).send('Invalid or expired token');
      }
  
      const user = await User.findOne({
        _id: decodedToken.userId,
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).send('Invalid or expired token');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.status(200).send('Password has been reset');
    } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).send('Internal Server Error');
    }
  };
module.exports = { requestPasswordReset, resetPassword };
