import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Calendar,
  Car,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Wrench,
  FileCheck,
  BarChart3,
  Package,
  Plus,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { vehicles, drivers, trips, setActiveTab } = useAppContext();
  const [showJobCardModal, setShowJobCardModal] = useState(true);

  React.useEffect(() => {
    setActiveTab("dashboard");
  }, [setActiveTab]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </button>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Job Cards Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FileCheck className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-bold">Job Cards</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Create and manage maintenance job cards for vehicles
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => (window.location.href = "/jobcards")}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              View all job cards
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => setShowJobCardModal(true)}
              className="text-green-600 hover:text-green-800 flex items-center ml-4"
            >
              <Plus className="w-4 h-4 mr-1" />
              New job card
            </button>
          </div>
        </div>

        {/* Parts Inventory Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-bold">Parts Inventory</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Track parts availability, usage, and purchase history
          </p>
          <button
            onClick={() => (window.location.href = "/parts")}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            Manage inventory
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Fleet Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-bold">Fleet Reports</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Generate detailed reports on vehicle performance and maintenance
          </p>
          <button
            onClick={() => (window.location.href = "/reports")}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            View reports
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Vehicle Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">
              Vehicle Status
            </h3>
            <Car className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-800">
              {vehicles?.length || 0}
            </p>
            <span className="ml-2 text-sm text-gray-500">vehicles</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-green-500 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />{" "}
              {Math.floor((vehicles?.length || 0) * 0.85)} operational
            </span>
            <span className="text-red-500 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />{" "}
              {Math.ceil((vehicles?.length || 0) * 0.15)} issues
            </span>
          </div>
        </div>

        {/* Driver Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Driver Status</h3>
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-800">
              {drivers?.length || 0}
            </p>
            <span className="ml-2 text-sm text-gray-500">drivers</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-green-500 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />{" "}
              {Math.floor((drivers?.length || 0) * 0.75)} available
            </span>
            <span className="text-blue-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />{" "}
              {Math.ceil((drivers?.length || 0) * 0.25)} on duty
            </span>
          </div>
        </div>

        {/* Trip Statistics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">
              Trip Statistics
            </h3>
            <MapPin className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-800">
              {trips?.length || 0}
            </p>
            <span className="ml-2 text-sm text-gray-500">trips</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-green-500 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />{" "}
              {Math.floor((trips?.length || 0) * 0.8)} completed
            </span>
            <span className="text-blue-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />{" "}
              {Math.ceil((trips?.length || 0) * 0.2)} in progress
            </span>
          </div>
        </div>

        {/* Maintenance Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Maintenance</h3>
            <Wrench className="w-5 h-5 text-purple-500" />
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-800">
              {Math.floor((vehicles?.length || 0) * 0.3)}
            </p>
            <span className="ml-2 text-sm text-gray-500">due soon</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-yellow-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />{" "}
              {Math.floor((vehicles?.length || 0) * 0.2)} scheduled
            </span>
            <span className="text-red-500 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />{" "}
              {Math.ceil((vehicles?.length || 0) * 0.1)} overdue
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Trips
            </h3>
          </div>
          <div className="p-6">
            {trips && trips.length > 0 ? (
              <div className="space-y-4">
                {trips.slice(0, 5).map((trip: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {trip?.route || `Trip #${index + 1001}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {trip?.driver || `Driver ${index + 1}`} •{" "}
                          {trip?.vehicle || `Vehicle ${index + 101}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {trip?.distance || `${(index + 1) * 50} km`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {trip?.date || "Today"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent trips available
              </p>
            )}
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Maintenance Alerts
            </h3>
          </div>
          <div className="p-6">
            {vehicles && vehicles.length > 0 ? (
              <div className="space-y-4">
                {vehicles.slice(0, 5).map((vehicle: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          index % 3 === 0
                            ? "bg-red-100"
                            : index % 3 === 1
                            ? "bg-yellow-100"
                            : "bg-green-100"
                        } flex items-center justify-center`}
                      >
                        <Wrench
                          className={`w-5 h-5 ${
                            index % 3 === 0
                              ? "text-red-600"
                              : index % 3 === 1
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {vehicle?.name || `Vehicle ${index + 101}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {index % 3 === 0
                            ? "Oil change overdue"
                            : index % 3 === 1
                            ? "Tire rotation needed"
                            : "Service scheduled"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xs font-medium ${
                          index % 3 === 0
                            ? "text-red-500"
                            : index % 3 === 1
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {index % 3 === 0
                          ? "Overdue"
                          : index % 3 === 1
                          ? "Due soon"
                          : "Upcoming"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {index % 3 === 0
                          ? "5 days ago"
                          : index % 3 === 1
                          ? "In 3 days"
                          : "In 2 weeks"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No maintenance alerts available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
