export default function Sidebar() {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-5">
        <h2 className="text-xl font-semibold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li><a href="#" className="block py-2 px-3 hover:bg-blue-600 rounded-md">Dashboard</a></li>
          <li><a href="#" className="block py-2 px-3 hover:bg-blue-600 rounded-md">Assets</a></li>
          <li><a href="#" className="block py-2 px-3 hover:bg-blue-600 rounded-md">Analytics</a></li>
          <li><a href="#" className="block py-2 px-3 hover:bg-blue-600 rounded-md">Alerts</a></li>
          <li><a href="#" className="block py-2 px-3 hover:bg-blue-600 rounded-md">Settings</a></li>
        </ul>
      </div>
    );
  }
  