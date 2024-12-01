export default function handler(req, res) {

    const assets = [
      { vehicleId: "1234", location: "Singapore", motionStatus: "moving" },
      { vehicleId: "5678", location: "United States", motionStatus: "stationary" },
      { vehicleId: "9101", location: "Singapore", motionStatus: "moving" },
    ];
  

    res.status(200).json(assets);
  }
  