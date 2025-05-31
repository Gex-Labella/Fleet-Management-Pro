import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Car,
  FileCheck,
  Filter,
  Search,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Clock,
  FileText,
  BarChart3,
  AlertCircle,
  Eye,
  Trash2,
  Edit,
  Package,
} from "lucide-react";
import { Vehicle } from "../models/types";
import JobCardModal from "../Components/JobCard/JobCardModal";

const FleetManagement: React.FC = () => {
  const { vehicles } = useAppContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showJobCardModal, setShowJobCardModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (statusFilter !== "all" && vehicle.status !== statusFilter) {
      return false;
    }
    if (
      searchQuery &&
      !vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCreateJobCard = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowJobCardModal(true);
  };

  const handleJobCardSubmit = (jobCardData: any) => {
    // Here you would dispatch an action or use context to save the job card
    console.log("Job Card Created:", jobCardData);
    // Navigate to job card detail page or show confirmation
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "maintenance":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">
            Manage your vehicle fleet and track performance
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Car className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Vehicles
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter((v) => v.status === "active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter((v) => v.status === "maintenance").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter((v) => v.status === "inactive").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Adding vehicle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Fleet Management</h1>
          <p className="text-gray-500 mt-1">
            Manage your fleet vehicles, maintenance history, and status
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Vehicles
          </h3>
          <p className="text-3xl font-bold mt-2">{vehicles.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">
            Active Vehicles
          </h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {vehicles.filter((v) => v.status === "active").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">
            In Maintenance
          </h3>
          <p className="text-3xl font-bold mt-2 text-orange-600">
            {vehicles.filter((v) => v.status === "maintenance").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">Inactive</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">
            {vehicles.filter((v) => v.status === "inactive").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="font-medium">Filters</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="maintenance">In Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Vehicle</th>
              <th className="py-3 px-4 text-left font-medium">VIN</th>
              <th className="py-3 px-4 text-left font-medium">Year</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">
                Assigned Driver
              </th>
              <th className="py-3 px-4 text-left font-medium">Mileage</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">
                  {vehicle.make} {vehicle.model}
                </td>
                <td className="py-3 px-4">{vehicle.vin}</td>
                <td className="py-3 px-4">{vehicle.year}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusBadgeClass(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="py-3 px-4">{vehicle.driver || "Unassigned"}</td>
                <td className="py-3 px-4">
                  {vehicle.mileage.toLocaleString()} km
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-md hover:bg-blue-50 text-blue-600">
                      <Eye className="w-5 h-5" aria-label="View Details" />
                    </button>
                    <button
                      className="p-1 rounded-md hover:bg-green-50 text-green-600"
                      onClick={() => handleCreateJobCard(vehicle)}
                    >
                      <FileText
                        className="w-5 h-5"
                        aria-label="Create Job Card"
                      />
                    </button>
                    <button className="p-1 rounded-md hover:bg-yellow-50 text-yellow-600">
                      <Wrench className="w-5 h-5" aria-label="Maintenance" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No vehicles found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter criteria.
          </p>
        </div>
      )}

      {showJobCardModal && (
        <JobCardModal
          vehicle={selectedVehicle}
          isOpen={showJobCardModal}
          onClose={() => setShowJobCardModal(false)}
          onSubmit={handleJobCardSubmit}
        />
      )}
    </div>
  );
};

export default FleetManagement;
