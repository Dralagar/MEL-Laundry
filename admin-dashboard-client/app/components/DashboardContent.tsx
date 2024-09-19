import Card from "./Card";
import RecentActivity from "./RecentActivity";

const DashboardContent = () => (
  <div>
    <h1 className="text-3xl font-semibold mb-8">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <Card title="200" subtitle="Machines in Use" />
      <Card title="$5,000" subtitle="Monthly Revenue" />
      <Card title="50" subtitle="New Registrations" />
    </div>
    <RecentActivity />
  </div>
);

export default DashboardContent;

