import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).send("Unauthorized : Invalid token");
    }

    req.user = decodedToken;
    next();
  });
};

export { authenticate };
