import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123",
  database: "trellodb",
});

export default pool;
