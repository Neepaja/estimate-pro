import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createTemplate = async (req, res) => {
  const { description, name, theme_color, created_by } = req.body;
  if (!description || !name || !theme_color || !created_by) {
    return res
      .status(400)
      .send("description, name, theme color, created by are required");
  }

  const postData = { id: uuidv4(), description, name, theme_color, created_by };
  const sqlQuery = "INSERT INTO templates SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("template added successfully");
  });
};

const getAllTemplates = async (req, res) => {
  const sqlQuery = "SELECT * FROM templates";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getTemplate = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM templates Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { description, name, theme_color, created_by } = req.body;

  if (!description || !name || !theme_color || !created_by) {
    return res
      .status(400)
      .send("description, name, theme color, created by are required");
  }

  const sqlQuery =
    "UPDATE templates SET description = ?, name = ?, theme_color = ?, created_by = ? WHERE id = ?";
  connection.query(
    sqlQuery,
    [description, name, theme_color, created_by, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Template not found");
      }
      return res.status(200).send("Template updated successfully");
    }
  );
};

const deleteTemplate = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM templates WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Template not found");
    }
    return res.status(200).send("Template deleted successfully");
  });
};


const getTemplateWithUser = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `
    SELECT t.*,
           u.id AS user_id, 
           u.first_name AS user_first_name, 
           u.last_name AS user_last_name, 
           u.status AS user_status, 
           u.img_url AS user_img_url, 
           u.pronouns AS user_pronouns, 
           u.email AS user_email, 
           u.created_at AS user_created_at, 
           u.updated_at AS user_updated_at
    FROM templates t
    LEFT JOIN users u ON t.created_by = u.id
    WHERE t.id=?
    `;


    connection.query(sqlQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Template not found");
      }
      return res.status(200).json(result);
    });
};


export {
  createTemplate,
  getAllTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateWithUser,
};
