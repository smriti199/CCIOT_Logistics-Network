import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Table() {
  const [assets, setAssets] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState("us"); // Default to US database

  const fetchAssets = async () => {
    setAssets([]);

    const url =
      selectedDatabase === "us"
        ? "/api/v1/assets/us"
        : selectedDatabase === "sg"
        ? "/api/v1/assets/sg"
        : "/api/v1/assets/centralized";

    try {
      const response = await fetch(url);
      const data = await response.json();
      setAssets(data); 
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [selectedDatabase]);

 
  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  const handleReset = async (endpoint) => {
    try {
      const response = await fetch(endpoint, { method: "POST" });
      if (response.ok) {
        fetchAssets();
      } else {
        console.error("Failed to reset database.");
      }
    } catch (error) {
      console.error("Error during reset:", error);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Vehicles Data</h1>
        <p className="text-lg text-gray-100 mb-6">Here are the details of all tracked assets in Version 1.</p>

        {/* Reset Buttons */}
        <div className="mb-4">
          <button
            className="mr-4 px-4 py-2 bg-red-200 text-gray-800 rounded"
            onClick={() => handleReset("/api/v1/resetAssets/us")}
          >
            Reset US Database
          </button>
          <button
            className="mr-4 px-4 py-2 bg-red-200 text-gray-800 rounded"
            onClick={() => handleReset("/api/v1/resetAssets/sg")}
          >
            Reset SG Database
          </button>
          <button
            className="px-4 py-2 bg-red-200 text-gray-800 rounded"
            onClick={() => handleReset("/api/v1/resetAssets/centralized")}
          >
            Reset Centralized Database
          </button>
        </div>

        {/* Dropdown to choose between us, sg, and centralized databases */}
        <select
          value={selectedDatabase}
          onChange={handleDatabaseChange}
          className="mb-4 p-2 bg-white rounded text-gray-800"
        >
          <option value="us">US Database Version 1</option>
          <option value="sg">SG Database Version 1</option>
          <option value="centralized">Centralized Database Version 1</option>
        </select>

        {/* Card-style container for table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Asset ID</th>
                {/* Conditionally render location columns */}
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
                    {/* Conditionally render location columns */}
                    {selectedDatabase !== "centralized" && (
                      <>
                        <td className="px-4 py-3">
                          {asset.location && typeof asset.location === 'string' && asset.location !== "undefined"
                            ? JSON.parse(asset.location)?.longitude || "N/A"
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {asset.location && typeof asset.location === 'string' && asset.location !== "undefined"
                            ? JSON.parse(asset.location)?.latitude || "N/A"
                            : "N/A"}
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
