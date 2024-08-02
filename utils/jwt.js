// jwt generate
import jwt from "jsonwebtoken";

const createToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export { createToken };
