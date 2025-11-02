import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import WebData from "../components/WebData";
import Bookings from "../components/Bookings";
import Messages from "../components/Messages";

const TABS = [
  { name: "Website Data", icon: "📊", component: WebData },
  { name: "Bookings", icon: "📅", component: Bookings },
  { name: "Messages", icon: "✉️", component: Messages },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ActiveComponent = TABS.find((tab) => tab.name === activeTab)?.component;

  return (
    <div className="flex bg-gray-100 z-30">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        tabs={TABS}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-0" : "md:ml-16"}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">{activeTab}</h1>
          <div className="bg-white rounded-lg shadow">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black  bg-opacity-50 z-0 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;