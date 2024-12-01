export default function AssetCard({ vehicleId, location, motionStatus }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Asset ID: {vehicleId}</h3>
          <p className="text-gray-600">Location: {location}</p>
          <p className={`text-lg ${motionStatus === "moving" ? "text-green-600" : "text-red-600"}`}>
            Status: {motionStatus}
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">View Details</button>
      </div>
    );
  }
  