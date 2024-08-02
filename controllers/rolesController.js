import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createRole = async (req, res) => {
  const { name, parent_level_id, created_by } = req.body;
  if (!name || !parent_level_id || !created_by) {
    return res
      .status(400)
      .send("name, parent_level_id, created by are required");
  }

  const postData = { id: uuidv4(), name, parent_level_id, created_by };
  const sqlQuery = "INSERT INTO roles SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("Role added successfully");
  });
};

const getAllRoles = async (req, res) => {
  const sqlQuery = "SELECT * FROM roles";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getRole = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM roles Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, parent_level_id, created_by } = req.body;
  if (!name || !parent_level_id || !created_by) {
    return res
      .status(400)
      .send("name, parent_level_id, created by are required");
  }

  const sqlQuery =
    "UPDATE roles SET name = ?, parent_level_id = ?, created_by = ?  WHERE id = ?";
  connection.query(
    sqlQuery,
    [name, parent_level_id, created_by, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Role not found");
      }
      return res.status(200).send("Role updated successfully");
    }
  );
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM roles WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Role not found");
    }
    return res.status(200).send("Role deleted successfully");
  });
};

export { createRole, getAllRoles, getRole, updateRole, deleteRole };
