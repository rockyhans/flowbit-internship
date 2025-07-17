const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Missing token');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).send('Invalid token');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') return res.status(403).send('Admins only');
  next();
};

module.exports = { verifyJWT, isAdmin };
