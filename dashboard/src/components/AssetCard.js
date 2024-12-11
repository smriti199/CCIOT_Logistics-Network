import Link from "next/link";

export default function AssetCard({
  vehicleId,
  location,
  motion,
  updateCount,
  countryCode,
  exportStatus,
  dutyCycle,
  cumulative_latency,
  avg_latency
}) {
  // Parse the location string 
  let longitude = '';
  let latitude = '';
  try {
    const locationData = JSON.parse(location);
    longitude = locationData.longitude;
    latitude = locationData.latitude;
  } catch (error) {
    console.error('Error parsing location data:', error);
    longitude = 'N/A';
    latitude = 'N/A';
  }

  // Handle motion and exportStatus as booleans 
  const motionStatus = motion === 'true' || motion === true ? 'Moving' : 'Stationary';
  const exportStatusText = exportStatus === 'true' || exportStatus === true ? 'Exported' : 'Not Exported';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-900">Asset ID: {vehicleId}</h3>
      <p className="text-sm text-gray-800">Country: {countryCode}</p>

      {/* Location */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Location:</h4>
        <p className="text-gray-800">Longitude: {longitude}</p>
        <p className="text-gray-800">Latitude: {latitude}</p>
      </div>

      {/* Motion Status */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Motion Status:</h4>
        <p className={motionStatus === 'Moving' ? 'text-green-800' : 'text-red-800'}>
          {motionStatus}
        </p>
      </div>

      {/* Export Status */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Export Status:</h4>
        <p className={exportStatusText === 'Exported' ? 'text-green-800' : 'text-red-800'}>
          {exportStatusText}
        </p>
      </div>

      {/* Update Count */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Update Count:</h4>
        <p className="text-gray-800">{updateCount}</p>
      </div>

      {/* Duty Cycle */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Duty Cycle:</h4>
        <p className="text-gray-800">{dutyCycle}%</p>
      </div>

      {/* Cumulative Latency */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Cumulative Latency:</h4>
        <p className="text-gray-800">{cumulative_latency ? cumulative_latency.toFixed(2) : 'N/A'}</p>
      </div>

      {/* Average Latency */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Average Latency:</h4>
        <p className="text-gray-800">{avg_latency ? avg_latency.toFixed(2) : 'N/A'}</p>
      </div>
    </div>
  );
}