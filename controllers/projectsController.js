import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createProject = async (req, res) => {
  const {
    team,
    name,
    created_by,
    theme_color,
    visibility,
    parent_template_id,
  } = req.body;
  if (
    !team ||
    !name ||
    !theme_color ||
    !created_by ||
    !visibility ||
    !parent_template_id
  ) {
    return res
      .status(400)
      .send(
        "team, name, theme color, created by , visibility, parent_template_id are required"
      );
  }

  const postData = {
    id: uuidv4(),
    team,
    name,
    created_by,
    theme_color,
    visibility,
    parent_template_id,
  };
  const sqlQuery = "INSERT INTO projects SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("projects added successfully");
  });
};

const getAllProjects = async (req, res) => {
  const sqlQuery = "SELECT * FROM projects";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getProject = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM projects Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    team,
    name,
    created_by,
    theme_color,
    visibility,
    parent_template_id,
  } = req.body;
  if (
    !team ||
    !name ||
    !theme_color ||
    !created_by ||
    !visibility ||
    !parent_template_id
  ) {
    return res
      .status(400)
      .send(
        "team, name, theme color, created by , visibility, parent_template_id are required"
      );
  }

  const sqlQuery = `
      UPDATE projects 
      SET team = ?, name = ?, theme_color = ?, created_by = ?, visibility = ?, parent_template_id = ?
      WHERE id = ?`;
  connection.query(
    sqlQuery,
    [team, name, theme_color, created_by, visibility, parent_template_id, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Project not found");
      }
      return res.status(200).send("Project updated successfully");
    }
  );
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM projects WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Project not found");
    }
    return res.status(200).send("Project deleted successfully");
  });
};



const getProjectWithTemplate = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `
    SELECT p.*,
           t.id AS template_id,
           t.description AS template_description,
           t.name AS template_name,
           t.theme_color AS template_theme_color,
           t.created_by AS template_created_by,
           t.created_at AS template_created_at,
           t.updated_at AS template_updated_at
    FROM projects p
    LEFT JOIN templates t ON p.parent_template_id = t.id;
    `;


    connection.query(sqlQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Project not found");
      }
      return res.status(200).json(result);
    });
};



const getProjectWithUser = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `
    SELECT p.*,
           u.id AS user_id, 
           u.first_name AS user_first_name, 
           u.last_name AS user_last_name, 
           u.status AS user_status, 
           u.img_url AS user_img_url, 
           u.pronouns AS user_pronouns, 
           u.email AS user_email, 
           u.created_at AS user_created_at, 
           u.updated_at AS user_updated_at
    FROM projects p
    LEFT JOIN users u ON p.created_by = u.id
    WHERE p.id=?
    `;


    connection.query(sqlQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Project not found");
      }
      return res.status(200).json(result);
    });
};



export {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectWithTemplate,
  getProjectWithUser,
};
