import pool from "../db/index.js";

export interface createUserType {
    email: string,
    username: string,
    passwordHash: string,
    timezone: string,
}

export interface UserRow {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  timezone: string;
}


export const createUser = async({
    email,
    username,
    passwordHash, 
    timezone
    }: createUserType) => {
    const result = await pool.query(
        `
        INSERT INTO users (email, username, password_hash, timezone)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, username, timezone
        `,
        [email, username, passwordHash, timezone]
        );
    return result.rows[0];
}

export const getUserByIdentifier = async(identifier: string) : Promise<UserRow | null> => {
    const isEmail = identifier.includes("@");
    
    
    const result = await pool.query(isEmail? `
        SELECT id, username, email, password_hash, timezone
        FROM users
        WHERE email = $1
        `:
        `SELECT id, username, email, password_hash, timezone
        FROM users
        WHERE email = $1
        `        
        , [identifier])

    return result.rows[0]?? null;
}