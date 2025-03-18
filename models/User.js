const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  qrCode: String
});

userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

  userSchema.pre('save', async function(next) {
    if (this.isNew) {
      const qrCodeData = `http://localhost:3000/login/${this.username}`;
      const qrCode = await QRCode.toDataURL(qrCodeData);
      this.qrCode = qrCode;
    }
    next();
  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;