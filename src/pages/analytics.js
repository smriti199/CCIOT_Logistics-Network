import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import { useState, useEffect } from "react";

export default function Analytics() {
  const [motionData, setMotionData] = useState([]);
  const [exportData, setExportData] = useState({ exported: 0, notExported: 0 });
  const [avgDutyCycle, setAvgDutyCycle] = useState(0);
  const [totalUpdates, setTotalUpdates] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch("/api/assets");
      const data = await response.json();
      // Ensure data.motionData is an array, if undefined set to an empty array
      setMotionData(data.motionData || []);
      setExportData(data.exportData || { exported: 0, notExported: 0 });
      setAvgDutyCycle(data.avgDutyCycle || 0);
      setTotalUpdates(data.totalUpdates || 0);
    };

    fetchAnalytics();
  }, []);

  // Prepare chart data only if motionData is defined and has items
  const motionChartData = motionData.length ? {
    labels: motionData.map(item => item.date),
    datasets: [{
      label: 'Motion Count',
      data: motionData.map(item => item.count),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  } : null;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Analytics</h1>
        <p className="text-lg text-gray-100">Track motion trends and export statistics here.</p>

        {/* Conditional rendering to avoid errors when data is not available */}
        {motionChartData ? (
          <ChartComponent dataSets={[motionChartData]} />
        ) : (
          <p>Loading motion data...</p>
        )}

        {/* Additional Analytics */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Analytics</h2>
          <p><strong>Average Duty Cycle:</strong> {avgDutyCycle}%</p>
          <p><strong>Total Updates:</strong> {totalUpdates}</p>
        </div>
      </div>
    </Layout>
  );
}
