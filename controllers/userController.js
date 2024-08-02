import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt.js";
import sendVerificationEmail from "../utils/email.js";

// Register user
const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    // status,
    img_url,
    pronouns,
    email,
    username,
    password,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    // !status ||
    !img_url ||
    !pronouns ||
    !email ||
    !username ||
    !password
  ) {
    return res.status(400).send("All fields are required");
  }

  const CheckUser = "SELECT * FROM users WHERE email = ? OR username = ?";
  connection.query(CheckUser, [email, username], async (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      return res.status(400).send("Email or Username already exists");
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const postData = {
        id: uuidv4(),
        first_name,
        last_name,
        status: "inactive",
        img_url,
        pronouns,
        email,
        username,
        password: hashedPassword,
      };

      const sqlQuery = "INSERT INTO users SET ?";
      connection.query(sqlQuery, postData, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        const token = createToken(postData.id, username);
        sendVerificationEmail(email, token);
        return res
          .status(201)
          .send({ message: "User added successfully", token });
      });
    } catch (err) {
      return res.status(500).send("Error in  create user");
    }
  });
};

const getAllUsers = async (req, res) => {
  const sqlQuery = "SELECT * FROM users";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM users Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) return res.status(404).send("User not found");

    return res.status(200).json(results);
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, status, img_url, pronouns, email, username } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !status ||
    !img_url ||
    !pronouns ||
    !email ||
    !username
  ) {
    return res
      .status(400)
      .send(
        "first_name , last_name , status , img_url , pronouns , email , username are required"
      );
  }

  const sqlQuery =
    "UPDATE users SET first_name = ?, last_name = ?, status = ?, img_url = ? , pronouns = ? , email = ?, username = ?  WHERE id = ?";
  connection.query(
    sqlQuery,
    [first_name, last_name, status, img_url, pronouns, email, username, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }
      return res.status(200).send("User updated successfully");
    }
  );
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM users WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User deleted successfully");
  });
};

export { createUser, getAllUsers, getUser, updateUser, deleteUser };
