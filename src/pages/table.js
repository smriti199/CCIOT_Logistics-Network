import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Table() {
  const [assets, setAssets] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState("region"); // Default to 'region'

  // Fetch assets based on selected database (region or centralized)
  useEffect(() => {
    const fetchAssets = async () => {
      const url = selectedDatabase === "region" ? "/api/assets/region" : "/api/assets/centralized";
      const response = await fetch(url);
      const data = await response.json();
      setAssets(data);
    };

    fetchAssets();
  }, [selectedDatabase]); // Re-fetch assets when selectedDatabase changes

  // Handle database selection change
  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Vehicles Data</h1>
        <p className="text-lg text-gray-100 mb-6">Here are the details of all tracked assets.</p>

        {/* Dropdown to choose between regional and centralized databases */}
        <select
          value={selectedDatabase}
          onChange={handleDatabaseChange}
          className="mb-4 p-2 bg-white rounded text-gray-800"
        >
          <option value="region">Regional Database</option>
          <option value="centralized">Centralized Database</option>
        </select>

        {/* Card-style container for table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Asset ID</th>
                {/* Conditionally render location columns */}
                {selectedDatabase === "region" && (
                  <>
                    <th className="px-4 py-2">Longitude</th>
                    <th className="px-4 py-2">Latitude</th>
                    <th className="px-4 py-2">Export Status</th>
                  </>
                )}
                <th className="px-4 py-2">Motion</th>
                <th className="px-4 py-2">Update Count</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Duty Cycle</th>
                <th className="px-4 py-2">Cumulative Latency</th>
                <th className="px-4 py-2">Average Latency</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <tr key={asset.vehicle_id} className="border-b text-gray-800">
                    <td className="px-4 py-3">{asset.vehicle_id}</td>
                    {/* Conditionally render location columns */}
                    {selectedDatabase === "region" && (
                      <>
                        <td className="px-4 py-3">
                          {asset.location && JSON.parse(asset.location)?.longitude || "N/A"}  
                        </td>
                        <td className="px-4 py-3">
                          {asset.location && JSON.parse(asset.location)?.latitude || "N/A"}
                        </td>
                        <td className="px-4 py-3">{asset.export === "true" ? "Exported" : "Not Exported"}</td>
                      </>
                    )}
                    <td className="px-4 py-3">{asset.motion === "true" ? "Moving" : "Stationary"}</td>
                    <td className="px-4 py-3">{asset.update_count}</td>
                    <td className="px-4 py-3">{asset.country_code}</td>
                    <td className="px-4 py-3">{asset.duty_cycle}%</td>
                    <td className="px-4 py-3">{asset.cumulative_latency ? asset.cumulative_latency.toFixed(2) : "N/A"}</td>
                    <td className="px-4 py-3">{asset.avg_latency ? asset.avg_latency.toFixed(2) : "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4">Loading assets...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
