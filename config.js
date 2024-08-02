import dotenv from "dotenv";
import assert from "assert";

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const {
  ENVIRONMENT,
  PORT,
  HOST,
  HOST_URL,
  JWT_SECRET,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASS,
} = process.env;

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(JWT_SECRET, "JWT_SECRET configuration is required.");

// export the configuration information as a default export
export default {
  environment: ENVIRONMENT,
  port: PORT,
  host: HOST,
  url: HOST_URL,
  jwtSecret: JWT_SECRET,
  db: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    multipleStatements: true,
  },
  charset: "utf8mb4",
};
