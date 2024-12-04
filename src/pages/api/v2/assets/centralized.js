import mysql from 'mysql2';

// Create a MySQL connection pool for the centralized database (centralized_v1, centralized_v2)
const pool = mysql.createPool({
  host: 'a9ce700e2283447668b04449a19ba784-889059d6801beaad.elb.ap-southeast-1.amazonaws.com',
  user: 'root',
  password: 'xM2809@coolcat',
  database: 'centralized_v2', // Use the correct centralized database
  port: 80,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Handler for /api/assets/centralized
export default async function handler(req, res) {
  try {
    // Query to get all assets data from the centralized database (no location and export)
    pool.query(
      'SELECT vehicle_id, motion, update_count, country_code, duty_cycle, cumulative_latency, avg_latency FROM vehicles_data',
      (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({ error: 'Database query failed', details: error.message });
        }

        // Return the asset data as the response
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
