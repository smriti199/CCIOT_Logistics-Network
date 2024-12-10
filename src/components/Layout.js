import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <div className="flex">
      <div className="w-64 bg-white text-black p-6">
        <ul className="mt-8 space-y-4">
          
          <li className={isActive("/tablev1") ? "text-blue-500 font-bold" : ""}>
            <Link href="/table">Table (Version 1)</Link>
          </li>
          <li className={isActive("/tablev2") ? "text-blue-500 font-bold" : ""}>
            <Link href="/tablev2">Table (Version 2)</Link>
          </li>
          <li className={isActive("/stats") ? "text-blue-500 font-bold" : ""}>
            <Link href="/stats">Stats</Link>
          </li>
          <li className={isActive("/centralizedv1") ? "text-blue-500 font-bold" : ""}>
            <Link href="/centralized">Centralized Version 1</Link>
          </li>
          <li className={isActive("/centralizedv2") ? "text-blue-500 font-bold" : ""}>
            <Link href="/centralizedv2">Centralized Version 2</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
