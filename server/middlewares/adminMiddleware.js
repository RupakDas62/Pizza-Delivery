const jwt = require('jsonwebtoken');

const adminOnly = (req, res, next) => {
  console.log(req.user);
  token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded && decoded.role === "admin") {
    next();
  } else {
    console.log("Frm admin middleware - else ");
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { adminOnly };
