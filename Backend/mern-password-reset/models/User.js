// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date,
});

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model('User', userSchema);

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('12345', 10); // Replace 'your-password' with the actual password
  const user = new User({
    email: 'mohamednihmath13@gmail.com',
    password: hashedPassword,
  });

  await user.save();
  console.log('User created!');
};

createUser().catch(err => console.log(err));

module.exports = mongoose.model('User', userSchema);
