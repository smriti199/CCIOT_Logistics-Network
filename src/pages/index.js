import Layout from "../components/Layout";
import AssetCard from "../components/AssetCard";
import ChartComponent from "../components/ChartComponent";
import { useState, useEffect } from "react";

export default function Home() {
  const [assets, setAssets] = useState([]);
  const [motionData, setMotionData] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  // API
  useEffect(() => {
    const fetchAssets = async () => {
      // Replace this with actual API from Xue Min
      const response = await fetch("/api/assets"); 
      const data = await response.json();
      setAssets(data);
    };

    const fetchAnalyticsData = () => {
      // Simulated data for checking Chartjs
      setMotionData([
        { date: "2023-01-01", count: 5 },
        { date: "2023-01-02", count: 10 },
        { date: "2023-01-03", count: 15 },
        { date: "2023-01-04", count: 7 },
        { date: "2023-01-05", count: 20 },
      ]);
      setUpdateData([
        { vehicleId: "1234", updateCount: 5 },
        { vehicleId: "5678", updateCount: 12 },
        { vehicleId: "9101", updateCount: 8 },
      ]);
    };

    fetchAssets();
    fetchAnalyticsData();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">IoT Asset Tracking Dashboard</h1>
        <p className="text-lg text-gray-600">I hope we do well.</p>

        {/* Asset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <AssetCard
              key={asset.vehicleId}
              vehicleId={asset.vehicleId}
              location={asset.location}
              motionStatus={asset.motionStatus}
            />
          ))}
        </div>

        {/* Analytics Charts */}
        <ChartComponent motionData={motionData} updateData={updateData} />
      </div>
    </Layout>
  );
}
