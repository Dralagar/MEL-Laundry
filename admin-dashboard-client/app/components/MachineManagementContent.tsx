"use client"; // Mark this as a client component

import React from "react";

const MachineManagementContent = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-semibold mb-8">Machine Management</h1>
      
      {/* Add your machine management content here */}
      <p className="text-lg text-gray-700 mb-4">
        Manage and monitor all the washing machines here. You can view their status, perform maintenance checks, and more.
      </p>
      
      {/* Example Table or List of Machines */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">001</td>
              <td className="px-6 py-4 whitespace-nowrap">Active</td>
              <td className="px-6 py-4 whitespace-nowrap">2024-09-10</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 hover:text-blue-700">View</button>
                <button className="ml-4 text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachineManagementContent;
