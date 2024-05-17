const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, "jwtkey");

    req.user = verified;

    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticate;
