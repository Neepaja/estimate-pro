import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createTeam = async (req, res) => {
  const { name, img_url } = req.body;
  if (!name || !img_url) {
    return res.status(400).send("Name and image url are required");
  }

  const postData = { id: uuidv4(), name, img_url };
  const sqlQuery = "INSERT INTO teams SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("teams added successfully");
  });
};

const getAllTeams = async (req, res) => {
  const sqlQuery = "SELECT * FROM teams";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getTeam = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM teams Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, img_url } = req.body;

  if (!name || !img_url) {
    return res.status(400).send("Name and image url are required");
  }

  const sqlQuery = "UPDATE teams SET name = ?, img_url = ? WHERE id = ?";
  connection.query(sqlQuery, [name, img_url, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Team not found");
    }
    return res.status(200).send("Team updated successfully");
  });
};

const deleteTeam = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM teams WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Team not found");
    }
    return res.status(200).send("Team deleted successfully");
  });
};

export { createTeam, getAllTeams, getTeam, updateTeam, deleteTeam };
