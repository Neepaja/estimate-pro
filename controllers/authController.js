import connection from "../config/db.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt.js";

// login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are required");
  }

  const CheckUser = "SELECT * FROM users WHERE username = ?";
  connection.query(CheckUser, [username], async (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(400).send("User does not exists");
    }

    const user = results[0];
    const isvalid = await bcrypt.compare(password, user.password);

    if (!isvalid) {
      return res.status(400).send("Incorrect password. Try again!");
    }

    const token = createToken(user.id, user.username);
    return res.status(200).send({ message: "successfully logged in", token });
  });
};

//email verification
const verifyEmail = (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Invalid or missing token");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).send("Invalid or expired token");
    }

    const userId = decoded.id;
    console.log("Decoded userId:", userId);

    const sqlQuery = "UPDATE users SET status = active WHERE id = ?";
    connection.query(sqlQuery, [userId], (error, result) => {
      if (error) {
        return res.status(500).send("Error updating user verification status");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }

      return res.status(200).send("Email verified successfully");
    });
  });
};

const resetPassword = async (req, res) => {
  const { username, newPassword, confirmNewPassword } = req.body;

  if ((!username, !newPassword, !confirmNewPassword)) {
    return res.status(400).send("All fields are required");
  }

  const CheckUser = "SELECT * FROM users WHERE username = ?  ";
  connection.query(CheckUser, [username], async (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(400).send("User doesn't exist");
    }

    if (newPassword != confirmNewPassword) {
      return res
        .status(400)
        .send("New password and confirm password mismatch!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const id = results[0].id;

    const UpdateUser = "UPDATE users SET password = ? WHERE id = ?";
    connection.query(UpdateUser, [hashedPassword, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send("Password reset successfully");
    });
  });
};

export { login, verifyEmail, resetPassword };
