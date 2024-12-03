import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function ChartComponent({ dataSets }) {
  // Check if dataSets is truthy and if it's an array with length before attempting to map
  const isDataAvailable = dataSets && Array.isArray(dataSets) && dataSets.length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
      {isDataAvailable ? (
        dataSets.map((dataset, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{dataset.title}</h3>
            {dataset.type === 'line' ? (
              <Line data={dataset.chartData} options={{ responsive: true }} />
            ) : (
              <Bar data={dataset.chartData} options={{ responsive: true }} />
            )}
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
