import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Stats() {
  const [avgLatencyV1, setAvgLatencyV1] = useState(null);
  const [avgDutyCycleV1, setAvgDutyCycleV1] = useState(null);
  const [avgLatencyV2, setAvgLatencyV2] = useState(null);
  const [avgDutyCycleV2, setAvgDutyCycleV2] = useState(null);

  const [selectedDatabaseV1, setSelectedDatabaseV1] = useState("sg"); // Default to SG for version 1
  const [selectedDatabaseV2, setSelectedDatabaseV2] = useState("sg"); // Default to SG for version 2

  // Fetch stats for version 1
  useEffect(() => {
    const fetchStatsV1 = async () => {
      const latencyResponseV1 = await fetch(`/api/v1/avg_latency/${selectedDatabaseV1}`);
      const dutyCycleResponseV1 = await fetch(`/api/v1/avg_duty_cycle/${selectedDatabaseV1}`);
      
      const latencyDataV1 = await latencyResponseV1.json();
      const dutyCycleDataV1 = await dutyCycleResponseV1.json();

      setAvgLatencyV1(latencyDataV1.average_latency);
      setAvgDutyCycleV1(dutyCycleDataV1.average_duty_cycle);
    };

    fetchStatsV1();
  }, [selectedDatabaseV1]); // Re-fetch stats for version 1 when selectedDatabaseV1 changes

  // Fetch stats for version 2
  useEffect(() => {
    const fetchStatsV2 = async () => {
      const latencyResponseV2 = await fetch(`/api/v2/avg_latency/${selectedDatabaseV2}`);
      const dutyCycleResponseV2 = await fetch(`/api/v2/avg_duty_cycle/${selectedDatabaseV2}`);
      
      const latencyDataV2 = await latencyResponseV2.json();
      const dutyCycleDataV2 = await dutyCycleResponseV2.json();

      setAvgLatencyV2(latencyDataV2.average_latency);
      setAvgDutyCycleV2(dutyCycleDataV2.average_duty_cycle);
    };

    fetchStatsV2();
  }, [selectedDatabaseV2]); // Re-fetch stats when selectedDatabaseV2 changes

  //Handle database selection change for version 1
  const handleDatabaseChangeV1 = (event) => {
    setSelectedDatabaseV1(event.target.value);
  };

  // Handle database selection  change for version 2
  const handleDatabaseChangeV2 = (event) => {
    setSelectedDatabaseV2(event.target.value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Statistics</h1>
        <p className="text-lg text-gray-100 mb-6">Here are the aggregated statistics for the selected databases (Version 1 and Version 2).</p>

        {/* Flexbox container to display two sections side by side */}
        <div className="flex space-x-8">
          {/* Version 1 Stats */}
          <div className="flex-1 space-y-6">
            <h2 className="text-xl text-white">Version 1</h2>

            {/* Dropdown for version 1 */}
            <div className="mb-4">
              <label className="text-white mr-2">Version 1 Database:</label>
              <select
                value={selectedDatabaseV1}
                onChange={handleDatabaseChangeV1}
                className="p-2 bg-white rounded text-gray-800"
              >
                <option value="sg">SG Database</option>
                <option value="us">US Database</option>
                <option value="centralized">Centralized Database</option>
              </select>
            </div>

            {/* Display average latency and duty cycle for version 1 */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Average Latency</h3>
              <p className="text-lg text-gray-100">{avgLatencyV1 ? avgLatencyV1.toFixed(2) : "Loading..."}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Average Duty Cycle</h3>
              <p className="text-lg text-gray-100">{avgDutyCycleV1 ? avgDutyCycleV1.toFixed(2) : "Loading..."}</p>
            </div>
          </div>

          {/* Version 2 Stats */}
          <div className="flex-1 space-y-6">
            <h2 className="text-xl text-white">Version 2</h2>

            {/* Dropdown for version 2 */}
            <div className="mb-4">
              <label className="text-white mr-2">Version 2 Database:</label>
              <select
                value={selectedDatabaseV2}
                onChange={handleDatabaseChangeV2}
                className="p-2 bg-white rounded text-gray-800"
              >
                <option value="sg">SG Database</option>
                <option value="us">US Database</option>
                <option value="centralized">Centralized Database</option>
              </select>
            </div>

            {/* Display average latency and duty cycle for version 2 */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Average Latency</h3>
              <p className="text-lg text-gray-100">{avgLatencyV2 ? avgLatencyV2.toFixed(2) : "Loading..."}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Average Duty Cycle</h3>
              <p className="text-lg text-gray-100">{avgDutyCycleV2 ? avgDutyCycleV2.toFixed(2) : "Loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
