"use client"; // Mark as client component

export default function RecentActivity() {
  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center border-b border-gray-200 pb-2">
          <span>User JohnDoe signed up</span>
          <span className="text-gray-600">2 hours ago</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-200 pb-2">
          <span>Order #1234 was completed</span>
          <span className="text-gray-600">5 hours ago</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Admin updated settings</span>
          <span className="text-gray-600">1 day ago</span>
        </li>
      </ul>
    </section>
  );
}
