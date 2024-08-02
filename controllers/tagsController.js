import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createTag = async (req, res) => {
  const { tag_name, theme_color, created_by } = req.body;
  if (!tag_name || !theme_color || !created_by) {
    return res
      .status(400)
      .send("tag name, theme color, created by are required");
  }

  const postData = { id: uuidv4(), tag_name, theme_color, created_by };
  const sqlQuery = "INSERT INTO tags SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("tag added successfully");
  });
};

const getAllTags = async (req, res) => {
  const sqlQuery = "SELECT * FROM tags";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getTag = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM tags Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateTag = async (req, res) => {
  const { id } = req.params;
  const { tag_name, theme_color, created_by } = req.body;

  if (!tag_name || !theme_color || !created_by) {
    return res
      .status(400)
      .send("tag name, theme color, created by are required");
  }

  const sqlQuery =
    "UPDATE tags SET tag_name = ?, theme_color = ?, created_by = ?  WHERE id = ?";
  connection.query(
    sqlQuery,
    [tag_name, theme_color, created_by, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Tag not found");
      }
      return res.status(200).send("Tag updated successfully");
    }
  );
};

const deleteTag = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM tags WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Tag not found");
    }
    return res.status(200).send("Tag deleted successfully");
  });
};

const getTagWithUser = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `
    SELECT tg.*,
           u.id AS user_id, 
           u.first_name AS user_first_name, 
           u.last_name AS user_last_name, 
           u.status AS user_status, 
           u.img_url AS user_img_url, 
           u.pronouns AS user_pronouns, 
           u.email AS user_email, 
           u.created_at AS user_created_at, 
           u.updated_at AS user_updated_at
    FROM tags tg
    LEFT JOIN users u ON tg.created_by = u.id
    WHERE tg.id=?
    `;


    connection.query(sqlQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Tag not found");
      }
      return res.status(200).json(result);
    });
};

export { createTag, getAllTags, getTag, updateTag, deleteTag, getTagWithUser };
