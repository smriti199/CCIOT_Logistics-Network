import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="w-64 bg-white text-gray-800 p-6">
        <ul className="mt-8 space-y-4">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/assets">Assets</Link>
          </li>
          <li>
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
