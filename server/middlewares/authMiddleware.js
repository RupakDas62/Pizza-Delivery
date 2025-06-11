const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  // console.log(req.headers.value)
  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // console.log(token)

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      // Attach user info to request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      // console.log(req.user)

      if (!req.user) {
        // console.log("User not found");
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (err) {
      console.error('Auth error:', err);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
