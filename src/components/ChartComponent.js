import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function ChartComponent({ motionData, updateData }) {
  // Line chart data for motion frequency
  const motionChartData = {
    labels: motionData.map(item => item.date), // X-axis: dates
    datasets: [
      {
        label: 'Motion Frequency',
        data: motionData.map(item => item.count), // Y-axis: motion counts
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Bar chart data for asset update count
  const updateChartData = {
    labels: updateData.map(item => item.vehicleId), // X-axis: vehicle IDs
    datasets: [
      {
        label: 'Asset Update Count',
        data: updateData.map(item => item.updateCount), // Y-axis: update count per asset
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
      
      {/* Motion Frequency Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Motion Frequency Over Time</h3>
        <Line data={motionChartData} options={{ responsive: true }} />
      </div>

      {/* Asset Update Count Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Asset Update Count</h3>
        <Bar data={updateChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}
