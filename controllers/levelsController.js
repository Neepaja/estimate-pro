import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createLevel = async (req, res) => {
  const { name, parent_team_id, created_by } = req.body;
  if (!name || !parent_team_id || !created_by) {
    return res
      .status(400)
      .send("name, parent_team_id, created by are required");
  }

  const postData = { id: uuidv4(), name, parent_team_id, created_by };
  const sqlQuery = "INSERT INTO levels SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("Level added successfully");
  });
};

const getAllLevels = async (req, res) => {
  const sqlQuery = "SELECT * FROM levels";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getLevel = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM levels Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateLevel = async (req, res) => {
  const { id } = req.params;
  const { name, parent_team_id, created_by } = req.body;
  if (!name || !parent_team_id || !created_by) {
    return res
      .status(400)
      .send("name, parent_team_id, created by are required");
  }

  const sqlQuery =
    "UPDATE levels SET name = ?, parent_team_id = ?, created_by = ?  WHERE id = ?";
  connection.query(
    sqlQuery,
    [name, parent_team_id, created_by, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Level not found");
      }
      return res.status(200).send("Level updated successfully");
    }
  );
};

const deleteLevel = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM levels WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Level not found");
    }
    return res.status(200).send("Level deleted successfully");
  });
};

export { createLevel, getAllLevels, getLevel, updateLevel, deleteLevel };
