import React from "react";
import {
  Car,
  Users,
  MapPin,
  Wrench,
  Fuel,
  BarChart3,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  FileCheck,
  Package,
  Plus,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { MenuItem } from "../../models/types";

const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    expandedFleetSection,
    toggleFleetSection,
    setIsAuthenticated,
    setShowJobCardModal,
  } = useAppContext();

  // Main menu items
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    // Fleet management has sub-items now, handled separately
    { id: "drivers", label: "Drivers", icon: Users },
    { id: "trips", label: "Trips & Dispatch", icon: MapPin },
    { id: "maintenance", label: "Maintenance & Repairs", icon: Wrench },
    { id: "fuel", label: "Fuel Management", icon: Fuel },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
    { id: "compliance", label: "Compliance & Documents", icon: FileText },
    { id: "notifications", label: "Notifications & Alerts", icon: Bell },
    { id: "users", label: "User Management", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support / Help Center", icon: HelpCircle },
  ];

  // Fleet management sub-items
  const fleetSubItems: MenuItem[] = [
    { id: "fleet", label: "Vehicles", icon: Car },
    { id: "jobcards", label: "Job Cards", icon: FileCheck },
    { id: "parts", label: "Parts Inventory", icon: Package },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("login");
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 h-full shadow-lg transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } flex flex-col fixed left-0 top-0 bottom-0 z-10`}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              FleetPro
            </h2>
          )}
        </div>
      </div>

      <nav className="mt-8 flex-1 overflow-y-auto">
        {/* Dashboard */}
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
            activeTab === "dashboard"
              ? "bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          {sidebarOpen && (
            <span className="text-sm font-medium">Dashboard</span>
          )}
        </button>

        {/* Fleet Management Section with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              toggleFleetSection();
              if (!sidebarOpen) {
                setActiveTab("fleet"); // If sidebar is collapsed, clicking the icon should go to fleet
              }
            }}
            className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              ["fleet", "jobcards", "parts"].includes(activeTab)
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Car className="w-5 h-5" />
              {sidebarOpen && (
                <span className="text-sm font-medium">Fleet Management</span>
              )}
            </div>
            {sidebarOpen &&
              (expandedFleetSection ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              ))}
          </button>

          {/* Dropdown menu for fleet management */}
          {expandedFleetSection && sidebarOpen && (
            <div className="pl-8 bg-gray-50 dark:bg-gray-700/50">
              {fleetSubItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                      activeTab === item.id
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Other menu items */}
        {menuItems.slice(1).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                // Add any special handling for specific tabs here if needed
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}

        {/* Button to open job card modal */}
        <button
          onClick={() => setShowJobCardModal(true)}
          className="text-green-600 hover:text-green-800 flex items-center ml-4"
        >
          <Plus className="w-4 h-4 mr-1" />
          New job card
        </button>
      </nav>

      {/* Logout button at the bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-red-600 dark:text-red-400"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
