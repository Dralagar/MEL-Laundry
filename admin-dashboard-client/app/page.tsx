"use client"; // Mark this as a client component

import { useState } from "react";
import Sidebar from "../app/components/Sidebar"; // Adjust the path if necessary
import Header from "../app/components/Header"; // Adjust the path if necessary
import DashboardContent from "../app/components/DashboardContent"; // Adjust the path if necessary
import MachineManagementContent from "../app/components/MachineManagementContent"; // Adjust the path if necessary
import UserManagementContent from "../app/components/UserManagementContent"; // Adjust the path if necessary
import SettingsContent from "../app/components/SettingsContent"; // Adjust the path if necessary
import ReportsContent from "../app/components/ReportsContent"; // Adjust the path if necessary
import styles from "./Home.module.css"; // Import the CSS module

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const handleMenuClick = (page: string) => {
    setActivePage(page);
  };

  const renderPageContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardContent />;
      case "Machine Management":
        return <MachineManagementContent />;
      case "User Management":
        return <UserManagementContent />;
      case "Settings":
        return <SettingsContent />;
      case "Reports":
        return <ReportsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar activePage={activePage} onMenuClick={handleMenuClick} className={styles.sidebar} />
      <div className={styles.mainContent}>
        
        <main className={styles.pageContent}>
          {/* Dynamically Render Page Content */}
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}
