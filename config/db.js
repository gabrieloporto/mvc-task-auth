import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  port: process.env.MYSQL_ADDON_PORT,
  password: process.env.MYSQL_ADDON_PASSWORD,
  uri: process.env.MYSQL_ADDON_URI,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export default pool;
