import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'us_region_v1',
  port: process.env.DB_PORT,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  try {
    pool.query(
      'SELECT vehicle_id, location, motion, update_count, country_code, export, duty_cycle, cumulative_latency, avg_latency FROM vehicles_data',
      (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({ error: 'Database query failed', details: error.message });
        }

        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
