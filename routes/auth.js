const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  user.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('User registered successfully!');
    }
  });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else if (!user) {
        res.status(401).send('Invalid username or password');
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            res.status(400).send(err);
          } else if (!isMatch) {
            res.status(401).send('Invalid username or password');
          } else {
            res.send('User logged in successfully!');
          }
        });
      }
    });
  });
  

  router.post('/generate-qr', (req, res) => {
    const { username } = req.body;
    const qrCodeData = `http://localhost:3000/login/${username}`;
    QRCode.toDataURL(qrCodeData, (err, qrCode) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(qrCode);
      }
    });
  });  

module.exports = router;