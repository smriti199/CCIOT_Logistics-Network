import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import { useState, useEffect } from "react";

export default function Analytics() {
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch("/api/assets");
      const data = await response.json();

      // Example processing to create datasets
      setDataSets([
        {
          title: 'Motion Trends Over Time',
          type: 'line',
          chartData: {
            labels: data.motionData.map(item => item.date),
            datasets: [{
              label: 'Motion Count',
              data: data.motionData.map(item => item.count),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            }],
          },
        },
        {
          title: 'Export Statistics',
          type: 'bar',
          chartData: {
            labels: ['Exported', 'Not Exported'],
            datasets: [{
              label: 'Count of assets',
              data: [data.exportData.exported, data.exportData.notExported],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
            }],
          },
        },
        // Add more datasets here based on additional statistics
      ]);
    };

    fetchAnalytics();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Analytics</h1>
        <p className="text-lg text-gray-100">Track motion trends and export statistics here.</p>

        {/* Analytics Charts */}
        <ChartComponent dataSets={dataSets} />
      </div>
    </Layout>
  );
}
