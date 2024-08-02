import connection from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createModule = async (req, res) => {
  const {
    name,
    description,
    assigned_user,
    theme_color,
    parent_component_id,
    start_time,
    end_time,
    weekly_working_hours,
    created_by,
  } = req.body;
  if (
    !name ||
    !description ||
    !assigned_user ||
    !theme_color ||
    !parent_component_id ||
    !start_time ||
    !end_time ||
    !weekly_working_hours ||
    !created_by
  ) {
    return res
      .status(400)
      .send(
        "name, description, assigned_user, theme_color, parent_component_id, start_time, end_time, weekly_working_hours, created_by are required"
      );
  }

  const postData = {
    id: uuidv4(),
    name,
    description,
    assigned_user,
    theme_color,
    parent_component_id,
    start_time,
    end_time,
    weekly_working_hours,
    created_by,
  };
  const sqlQuery = "INSERT INTO modules SET ?";
  connection.query(sqlQuery, postData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send("Module added successfully");
  });
};
const getAllModules = async (req, res) => {
  const sqlQuery = `
  SELECT 
  modules.*, 
  users.first_name AS assigned_user_name,
  users.email AS assigned_user_email,
  components.name AS parent_component_name
  FROM modules
  LEFT JOIN users ON modules.assigned_user = users.id
  LEFT JOIN components ON modules.parent_component_id = components.id
  `;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const getModule = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM modules Where id = ? ";
  connection.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(results);
  });
};

const updateModule = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    assigned_user,
    theme_color,
    parent_component_id,
    start_time,
    end_time,
    weekly_working_hours,
    created_by,
  } = req.body;

  if (
    !name ||
    !description ||
    !assigned_user ||
    !theme_color ||
    !parent_component_id ||
    !start_time ||
    !end_time ||
    !weekly_working_hours ||
    !created_by
  ) {
    return res
      .status(400)
      .send(
        "name, description, assigned_user, theme_color, parent_component_id, start_time, end_time, weekly_working_hours, created_by are required"
      );
  }

  const sqlQuery =
    "UPDATE modules SET name = ?, description = ?, assigned_user = ?, theme_color = ?, parent_component_id = ?, start_time = ?, end_time = ?, weekly_working_hours = ?, created_by = ? WHERE id = ?";
  connection.query(
    sqlQuery,
    [
      name,
      description,
      assigned_user,
      theme_color,
      parent_component_id,
      start_time,
      end_time,
      weekly_working_hours,
      created_by,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Module not found");
      }
      return res.status(200).send("Module updated successfully");
    }
  );
};

const deleteModule = async (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM modules WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Module not found");
    }
    return res.status(200).send("Module deleted successfully");
  });
};

export { createModule, getAllModules, getModule, updateModule, deleteModule };
