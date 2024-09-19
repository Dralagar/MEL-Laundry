export default function ReportsContent() {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-8">Reports</h1>
        <p className="text-gray-700 mb-4">
          This section contains all the reports related to the MEL Laundry business. You can view and generate reports on various metrics, including:
        </p>
        <ul className="list-disc list-inside">
          <li>Total revenue by month</li>
          <li>Machine usage statistics</li>
          <li>User activity reports</li>
          <li>Service and maintenance logs</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Use the filters or export options to generate reports in the desired format.
        </p>
  
        {/* Example buttons for interaction */}
        <div className="flex space-x-4 mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Generate Report
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Export CSV
          </button>
        </div>
      </div>
    );
  }
  