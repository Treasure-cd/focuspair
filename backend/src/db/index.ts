import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
    user: process.env.USER,
    host: "localhost",
    database: "focus_pair",
    password: process.env.PASSWORD,
    port: 5432,
});

export default pool;