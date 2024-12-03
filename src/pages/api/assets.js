// pages/api/assets.js
import mysql from 'mysql2';

// Create a MySQL connection pool for the us_region_v1 database
const pool = mysql.createPool({
  host: 'a9ce700e2283447668b04449a19ba784-889059d6801beaad.elb.ap-southeast-1.amazonaws.com',
  user: 'root',                         // Your MySQL user
  password: 'xM2809@coolcat',            // Your MySQL password
  database: "us_region_v1",
  port: 80,                           // MySQL default port
  connectTimeout: 60000,                // Set timeout to 30 seconds
  waitForConnections: true,             // Allow waiting for idle connections in the pool
  connectionLimit: 10,                  // Maximum number of connections in the pool
  queueLimit: 0                         // Unlimited queued connections
});

// Handler function for /api/assets
export default async function handler(req, res) {
  try {
    // Query to get all assets data including cumulative_latency and avg_latency
    pool.query('SELECT vehicle_id, location, motion, update_count, country_code, export, duty_cycle, cumulative_latency, avg_latency FROM vehicles_data', (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Database query failed', details: error.message });
      }

      // Return the asset data as the response
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error in handler:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
}

/*
export default async function handler(req, res) {
    try {
      // Disable caching by setting the headers
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  
      // Query to get motion data (how many assets are moving vs stationary)
      pool.query('SELECT motion, COUNT(*) AS count FROM vehicles_data GROUP BY motion', (error, results) => {
        if (error) {
          console.error('Error executing query for motion data:', error);
          res.status(500).json({ error: 'Database query failed for motion data' });
          return;
        }
  
        const motionData = results.map(item => ({
          motion: item.motion === 'true' ? 'Moving' : 'Stationary',
          count: item.count,
        }));
  
        // Query to get export data (how many assets are marked for export)
        pool.query('SELECT export, COUNT(*) AS count FROM vehicles_data GROUP BY export', (error2, results2) => {
          if (error2) {
            console.error('Error executing query for export data:', error2);
            res.status(500).json({ error: 'Database query failed for export data' });
            return;
          }
  
          const exportData = {
            exported: results2.find(item => item.export === 'true')?.count || 0,
            notExported: results2.find(item => item.export === 'false')?.count || 0,
          };
  
          // Query to get the average duty cycle (average value of the duty cycle)
          pool.query('SELECT AVG(duty_cycle) AS avg_duty_cycle FROM vehicles_data', (error3, results3) => {
            if (error3) {
              console.error('Error executing query for average duty cycle:', error3);
              res.status(500).json({ error: 'Database query failed for average duty cycle' });
              return;
            }
  
            const avgDutyCycle = results3[0]?.avg_duty_cycle || 0;
  
            // Query to get the total update count across all assets (how many updates have occurred)
            pool.query('SELECT SUM(update_count) AS total_updates FROM vehicles_data', (error4, results4) => {
              if (error4) {
                console.error('Error executing query for total updates:', error4);
                res.status(500).json({ error: 'Database query failed for total updates' });
                return;
              }
  
              const totalUpdates = results4[0]?.total_updates || 0;
  
              // Query to get other data if necessary, e.g., total number of assets
              pool.query('SELECT COUNT(*) AS total_assets FROM vehicles_data', (error5, results5) => {
                if (error5) {
                  console.error('Error executing query for total assets:', error5);
                  res.status(500).json({ error: 'Database query failed for total assets' });
                  return;
                }
  
                const totalAssets = results5[0]?.total_assets || 0;
  
                // Final combined response with all data
                res.status(200).json({
                  motionData,
                  exportData,
                  avgDutyCycle,
                  totalUpdates,
                  totalAssets,
                });
              });
            });
          });
        });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }*/