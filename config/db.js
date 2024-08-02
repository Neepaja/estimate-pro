import mysql from "mysql";
import config from "../config.js";

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database");
});

export default connection;
