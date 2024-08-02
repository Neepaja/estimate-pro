import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createComponent = async (req, res) => {
  const { name, parent_template_or_component, created_by } = req.body;
  if (!name || !parent_template_or_component || !created_by) {
    return res
      .status(400)
      .send("name, parent_template_or_component, created_by are required");
  }

  const postData = {
    id: uuidv4(),
    name,
    parent_template_or_component,
    created_by,
  };
  const sqlQuery = "INSERT INTO components SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("component added successfully");
  });
};

const getAllComponents = async (req, res) => {
  const sqlQuery = "SELECT * FROM components";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getComponent = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM components Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateComponent = async (req, res) => {
  const { id } = req.params;
  const { name, parent_template_or_component, created_by } = req.body;

  if (!name || !parent_template_or_component || !created_by) {
    return res
      .status(400)
      .send("name, parent_template_or_component, created_by are required");
  }

  const sqlQuery =
    "UPDATE components SET name = ?, parent_template_or_component = ?, created_by = ? WHERE id = ?";
  connection.query(
    sqlQuery,
    [name, parent_template_or_component, created_by, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("component not found");
      }
      return res.status(200).send("component updated successfully");
    }
  );
};

const deleteComponent = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM components WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("component not found");
    }
    return res.status(200).send("component deleted successfully");
  });
};

export {
  createComponent,
  getAllComponents,
  getComponent,
  updateComponent,
  deleteComponent,
};
