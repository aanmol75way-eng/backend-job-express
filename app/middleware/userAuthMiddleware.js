const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized: No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.AUTHKEY);

    req.userId = decoded.id; // attach ONLY user ID to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
