import pool from "../db/index.js";

export async function findUserById(id: string) {
  const result = await pool.query(
    "SELECT id, email, username, created_at, timezone FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0] ?? null;
}