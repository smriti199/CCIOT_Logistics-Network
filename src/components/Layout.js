import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  // Function to determine if the link is the current active route
  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <div className="flex">
      <div className="w-64 bg-white text-gray-800 p-6">
        <ul className="mt-8 space-y-4">
          <li className={isActive("/") ? "text-blue-500 font-bold" : ""}>
            <Link href="/">Dashboard</Link>
          </li>
          <li className={isActive("/assets") ? "text-blue-500 font-bold" : ""}>
            <Link href="/assets">Assets</Link>
          </li>
          <li className={isActive("/analytics") ? "text-blue-500 font-bold" : ""}>
            <Link href="/analytics">Analytics</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
