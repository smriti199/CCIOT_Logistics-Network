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
      <div className="w-64 bg-white text-black p-6">
        <ul className="mt-8 space-y-4">
          <li className={isActive("/") ? "text-blue-500 font-bold" : ""}>
            <Link href="/">Dashboard</Link>
          </li>
          
          <li className={isActive("/table") ? "text-blue-500 font-bold" : ""}>
            <Link href="/table">Table</Link>
          </li>
          <li className={isActive("/stats") ? "text-blue-500 font-bold" : ""}>
            <Link href="/stats">Stats</Link>
          </li>
          <li className={isActive("/centralized") ? "text-blue-500 font-bold" : ""}>
            <Link href="/centralized">Centralized</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
