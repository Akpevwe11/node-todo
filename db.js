import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();


const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});



export default pool;