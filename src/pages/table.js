import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Table() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch("/api/assets");
      const data = await response.json();
      setAssets(data); // Set the fetched data into the state
    };

    fetchAssets();
  }, []); // Empty array to only run once when the component is mounted

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Assets</h1>
        <p className="text-lg text-gray-100 mb-6">Here are the details of all tracked assets.</p>

        {/* Card-style container for table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Asset ID</th>
                <th className="px-4 py-2">Longitude</th>
                <th className="px-4 py-2">Latitude</th>
                <th className="px-4 py-2">Motion</th>
                <th className="px-4 py-2">Update Count</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Export Status</th>
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
                    <td className="px-4 py-3">{JSON.parse(asset.location)?.longitude || 'N/A'}</td>
                    <td className="px-4 py-3">{JSON.parse(asset.location)?.latitude || 'N/A'}</td>
                    <td className="px-4 py-3">{asset.motion === "true" ? "Moving" : "Stationary"}</td>
                    <td className="px-4 py-3">{asset.update_count}</td>
                    <td className="px-4 py-3">{asset.country_code}</td>
                    <td className="px-4 py-3">{asset.export === "true" ? "Exported" : "Not Exported"}</td>
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