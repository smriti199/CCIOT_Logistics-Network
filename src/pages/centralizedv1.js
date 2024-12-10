import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Centralized() {
  const [assets, setAssets] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("US"); // Default to US country

  useEffect(() => {
    const fetchAssets = async () => {
      const url = `/api/v1s/assets/centralizedv2?country=${selectedCountry}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error("Error fetching centralized assets:", error);
      }
    };

    fetchAssets();
  }, [selectedCountry]); // Re-fetch assets when selectedCountry changes

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Centralized Vehicles Data</h1>
        <p className="text-lg text-gray-100 mb-6">Here are the details of all tracked assets in the Centralized database.</p>

        {/* Country filter for centralized database */}
        <div className="mb-4">
          <label htmlFor="country" className="mr-2 text-white">Filter by Country:</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="p-2 bg-white rounded text-gray-800"
          >
            <option value="US">US</option>
            <option value="SG">SG</option>
          </select>
        </div>

        {/* Table for displaying centralized assets */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Asset ID</th>
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
                  <td colSpan="7" className="text-center py-4">Loading assets...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
