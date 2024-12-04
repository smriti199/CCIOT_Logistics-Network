import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Table() {
  const [assets, setAssets] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState("us"); // Default to 'us' database

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch(`/api/assets/${selectedDatabase}`);
      const data = await response.json();
      setAssets(data);
    };

    fetchAssets();
  }, [selectedDatabase]);

  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };
  
  const resetDatabase = async (db) => {
    const response = await fetch(`/api/resetassets/${db}`, {
      method: 'POST', // Use POST for reset action
    });

    const result = await response.json();
    alert(result.message); // Show success/failure message
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Vehicles Data</h1>
        <p className="text-lg text-gray-100 mb-6">Here are the details of all tracked assets.</p>

        {/* Reset Buttons */}
        <div className="mb-4">
          <button
            onClick={() => resetDatabase("sg")}
            className="px-4 py-2 bg-red-200 text-gray-800 rounded mr-2"
          >
            Reset SG Database
          </button>
          <button
            onClick={() => resetDatabase("us")}
            className="px-4 py-2 bg-red-200 text-gray-800 rounded mr-2"
          >
            Reset US Database
          </button>
          <button
            onClick={() => resetDatabase("centralized")}
            className="px-4 py-2 bg-red-200 text-gray-800 rounded"
          >
            Reset Centralized Database
          </button>
        </div>

        {/* Dropdown to choose between regional and centralized databases */}
        <div className="mb-4">
          <select
            value={selectedDatabase}
            onChange={handleDatabaseChange}
            className="px-4 py-2 bg-blue-100 text-gray-800 rounded"
          >
            <option value="us">US Database</option>
            <option value="sg">SG Database</option>
            <option value="centralized">Centralized Database</option>
          </select>
        </div>


        {/* Table Display */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Asset ID</th>
                {selectedDatabase !== "centralized" && (
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
                    {selectedDatabase !== "centralized" && (
                      <>
                        <td className="px-4 py-3">{JSON.parse(asset.location)?.longitude || "N/A"}</td>
                        <td className="px-4 py-3">{JSON.parse(asset.location)?.latitude || "N/A"}</td>
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
