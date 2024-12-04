//src/pages/index.js
import Layout from "../components/Layout";
import AssetCard from "../components/AssetCard";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const [assets, setAssets] = useState([]);
  const [motionData, setMotionData] = useState([]);
  const [exportData, setExportData] = useState({ exported: 0, notExported: 0 });
  const [avgDutyCycle, setAvgDutyCycle] = useState(0);
  const [totalUpdates, setTotalUpdates] = useState(0);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch("/api/assets/us.js");
      const data = await response.json();
      setAssets(data);

      /*
      // analytics data
      setMotionData(data.motionData);
      setExportData(data.exportData);
      setAvgDutyCycle(data.avgDutyCycle);
      setTotalUpdates(data.totalUpdates);
      */
    };

    fetchAssets();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <Navbar />
        <h1 className="text-3xl font-bold text-white mb-6">Welcome to the IoT Asset Tracking Dashboard</h1>
        <p className="text-lg text-gray-100">Here you can track assets, view analytics, and manage the system.</p>

        {/* Displaying the Duty Cycle and Update Count */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Additional Analytics</h2>
          <p><strong>Average Duty Cycle:</strong> {avgDutyCycle}%</p>
          <p><strong>Total Updates:</strong> {totalUpdates}</p>
        </div>

        {/* Asset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.length > 0 ? (
          assets.map((asset) => {
            console.log(asset); // Debug log to verify each asset's structure
            return (
              <AssetCard
                key={asset.vehicle_id}
                vehicleId={asset.vehicle_id}
                motion={asset.motion}
                updateCount={asset.update_count}
                countryCode={asset.country_code}
                dutyCycle={asset.duty_cycle || 0}
              />
            );
          })
        ) : (
          <p>Loading assets...</p>
        )}
        </div>
      </div>
    </Layout>
  );
}