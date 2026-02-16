import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@123",
  database: "campus_note",
});
db.connect((err) => {
  if (err) {
    console.log("====================================");
    console.log("Database connection failed:", err.message);
    console.log("====================================");
  } else {
    console.log("====================================");
    console.log("MYSQL Database connected");
    console.log("====================================");
  }
});
export default db;
