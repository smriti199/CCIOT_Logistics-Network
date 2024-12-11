import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'sg_region_v2',
  port: process.env.DB_PORT,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  try {
    pool.query(
      `UPDATE vehicles_data 
       SET motion = 'false', location = '{"longitude": 0, "latitude": 0}', country_code = 'SG', 
           export = 'false', update_count = 0, duty_cycle = NULL, cumulative_latency = NULL, avg_latency = NULL`,
      (error) => {
        if (error) {
          console.error('Error resetting SG region:', error);
          return res.status(500).json({ error: 'Failed to reset SG region data' });
        }

        res.status(200).json({ message: 'SG region database reset successfully' });
      }
    );
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
