import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'centralized_v1',
  port: process.env.DB_PORT,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
export default async function handler(req, res) {
  try {
    pool.query('DELETE FROM vehicles_data', (error) => {
      if (error) {
        console.error('Error resetting Centralized data:', error);
        return res.status(500).json({ error: 'Failed to reset Centralized data' });
      }

      res.status(200).json({ message: 'Centralized database reset successfully' });
    });
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
