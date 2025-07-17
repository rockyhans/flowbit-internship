const express = require('express');
const router = express.Router();
const registry = require('../../registry.json');

router.get('/screens', (req, res) => {
  const result = registry.filter(r => r.tenant === req.user.customerId);
  res.json(result);
});

module.exports = router;
