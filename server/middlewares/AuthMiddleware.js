const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) return res.status(401).json("user not logged in!");

  const token = authorizationHeader.split(" ")[1];

  if (!token) return res.status(401).json("user not logged in!");

  try {
    const validToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (validToken) {
      return next();
    }
  } catch (err) {
    res.status(401).json({ error: "Forbidden!" });
  }
};

module.exports = { validateToken };