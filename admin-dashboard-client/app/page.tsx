"use client"; // Mark this as a client component

import { useState } from "react";
import Sidebar from "../app/components/Sidebar";
import Header from "../app/components/Header";
import DashboardContent from "../app/components/DashboardContent";
import MachineManagementContent from "../app/components/MachineManagementContent";
import UserManagementContent from "../app/components/UserManagementContent";
import SettingsContent from "../app/components/SettingsContent";
import ReportsContent from "../app/components/ReportsContent";
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
        <Header className={styles.header} />

        <main className={styles.pageContent}>
          {/* Dynamically Render Page Content */}
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}
