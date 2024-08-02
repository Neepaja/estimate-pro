import mysql from "mysql";
import fs from "fs"
import config from "./config.js";


console.log("Database migration started!");

var db = mysql.createPool(config.db);
db.on("connection", (connection) => {
  console.log("Database connected!");

  connection.on("error", (err) => {
    console.error(new Date(), "MySQL error", err.code);
  });

  connection.on("close", (err) => {
    console.error(new Date(), "MySQL close", err);
  });
});

fs.readFile("database/init.sql", "utf8", function (err, data) {
  if (err) throw err;
  db.query(data, function (err, result) {
    if (err) throw err;
    console.log("Database migration completed!");
    process.exit();
  });
});
