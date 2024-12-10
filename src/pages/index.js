import Layout from "../components/Layout";


export default function Home() {

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Welcome to the IoT Asset Tracking Dashboard</h1>
        <p className="text-lg text-gray-100">Here you can track assets, view analytics, and manage the system.</p>
        <p className="text-lg text-gray-100">Use the Navigation Bar on the left to look at the data.</p>
      </div>
    </Layout>
  );
}