import { useState, useEffect } from "react";
import AssetCard from "../components/AssetCard";
import Layout from "../components/Layout";

export default function Assets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch("/api/assets"); // Always fetch from a standard API endpoint
      const data = await response.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Assets</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assets.length > 0 ? assets.map((asset) => (
            <AssetCard
              key={asset.vehicle_id}
              vehicleId={asset.vehicle_id}
              location={asset.location}
              motion={asset.motion}
              updateCount={asset.update_count}
              countryCode={asset.country_code}
              exportStatus={asset.export}
              dutyCycle={asset.duty_cycle}
              cumulative_latency={asset.cumulative_latency}
              avg_latency={asset.avg_latency || 0}
            />
          )) : <p>Loading assets...</p>}
        </div>
      </div>
    </Layout>
  );
}
