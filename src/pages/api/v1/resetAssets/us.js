import mysql from 'mysql2';

// MySQL connection pool for US region
const pool = mysql.createPool({
  host: 'a9ce700e2283447668b04449a19ba784-889059d6801beaad.elb.ap-southeast-1.amazonaws.com',
  user: 'root',
  password: 'xM2809@coolcat',
  database: 'us_region_v1',
  port: 80,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  try {
    // Query to reset the US region vehicles_data
    pool.query(
      `UPDATE vehicles_data 
       SET motion = 'false', location = '{"longitude": 0, "latitude": 0}', country_code = 'US', 
           export = 'false', update_count = 0, duty_cycle = NULL, cumulative_latency = NULL, avg_latency = NULL`,
      (error) => {
        if (error) {
          console.error('Error resetting US region:', error);
          return res.status(500).json({ error: 'Failed to reset US region data' });
        }

        res.status(200).json({ message: 'US region database reset successfully' });
      }
    );
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
