import mysql from 'mysql2';

// MySQL connection pool for Centralized data
const pool = mysql.createPool({
  host: 'a9ce700e2283447668b04449a19ba784-889059d6801beaad.elb.ap-southeast-1.amazonaws.com',
  user: 'root',
  password: 'xM2809@coolcat',
  database: 'centralized_v2',
  port: 80,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  try {
    // Query to reset centralized vehicles_data
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
