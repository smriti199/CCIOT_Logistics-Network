import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Stats() {
  const [avgLatency, setAvgLatency] = useState(null);
  const [avgDutyCycle, setAvgDutyCycle] = useState(null);
  const [selectedDatabase, setSelectedDatabase] = useState("sg"); // Default to SG database

  useEffect(() => {
    // Fetch the average latency and duty cycle based on the selected database
    const fetchStats = async () => {
      const latencyResponse = await fetch(`/api/avg_latency/${selectedDatabase}`);
      const dutyCycleResponse = await fetch(`/api/avg_duty_cycle/${selectedDatabase}`);
      
      const latencyData = await latencyResponse.json();
      const dutyCycleData = await dutyCycleResponse.json();

      setAvgLatency(latencyData.average_latency);
      setAvgDutyCycle(dutyCycleData.average_duty_cycle);
    };

    fetchStats();
  }, [selectedDatabase]); // Re-fetch stats when selectedDatabase changes

  // Handle database selection change
  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Statistics</h1>
        <p className="text-lg text-gray-100 mb-6">Here are the aggregated statistics for the selected database.</p>

        {/* Dropdown to choose between US, SG, or Centralized databases */}
        <select
          value={selectedDatabase}
          onChange={handleDatabaseChange}
          className="mb-4 p-2 bg-white rounded text-gray-800"
        >
          <option value="sg">SG Database</option>
          <option value="us">US Database</option>
          <option value="centralized">Centralized Database</option>
        </select>

        {/* Display average latency and duty cycle */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Average Latency</h2>
          <p className="text-lg text-gray-100">{avgLatency ? avgLatency.toFixed(2) : "Loading..."}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Average Duty Cycle</h2>
          <p className="text-lg text-gray-100">{avgDutyCycle ? avgDutyCycle.toFixed(2) : "Loading..."}</p>
        </div>
      </div>
    </Layout>
  );
}
