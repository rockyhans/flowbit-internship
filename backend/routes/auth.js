const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id, role: user.role, customerId: user.customerId }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
