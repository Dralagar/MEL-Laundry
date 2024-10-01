import React from "react";

// Define the prop types, including the optional className prop
interface SidebarProps {
  activePage: string;
  onMenuClick: (page: string) => void; // Function type for handling menu clicks
  className?: string; // Optional className prop
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onMenuClick, className }) => {
  return (
    <aside className={`${className} bg-gray-800 text-white w-full lg:w-64 h-full fixed lg:relative lg:flex lg:flex-col`}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      </div>
      <ul className="space-y-4 px-4">
        <li
          className={`cursor-pointer ${activePage === "Dashboard" ? "bg-gray-700" : ""}`}
          onClick={() => onMenuClick("Dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`cursor-pointer ${activePage === "Machine Management" ? "bg-gray-700" : ""}`}
          onClick={() => onMenuClick("Machine Management")}
        >
          Machine Management
        </li>
        <li
          className={`cursor-pointer ${activePage === "User Management" ? "bg-gray-700" : ""}`}
          onClick={() => onMenuClick("User Management")}
        >
          User Management
        </li>
        <li
          className={`cursor-pointer ${activePage === "Settings" ? "bg-gray-700" : ""}`}
          onClick={() => onMenuClick("Settings")}
        >
          Settings
        </li>
        <li
          className={`cursor-pointer ${activePage === "Reports" ? "bg-gray-700" : ""}`}
          onClick={() => onMenuClick("Reports")}
        >
          Reports
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
