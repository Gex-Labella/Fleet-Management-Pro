import React, { useState } from "react";
import { Wrench, Check, Clock, Filter, Plus, Search } from "lucide-react";
import JobCardModal from "../Components/JobCard/JobCardModal";
import { Vehicle } from "../models/types";

interface JobCard {
  id: string;
  vehicleId: string;
  vehicleName: string;
  status: "open" | "in_progress" | "completed" | "pending_parts";
  priority: "low" | "medium" | "high" | "critical";
  department: "mechanical" | "electrical" | "body" | "tires" | "welding";
  description: string;
  dateCreated: string;
  assignedTo: string;
  estimatedCompletion: string;
}

const mockJobCards: JobCard[] = [
  {
    id: "JC001",
    vehicleId: "1",
    vehicleName: "Ford Transit",
    status: "open",
    priority: "high",
    department: "mechanical",
    description: "Engine overheating during long trips",
    dateCreated: "2024-01-15",
    assignedTo: "John Mechanic",
    estimatedCompletion: "2024-01-18",
  },
  {
    id: "JC002",
    vehicleId: "2",
    vehicleName: "Mercedes Sprinter",
    status: "in_progress",
    priority: "medium",
    department: "electrical",
    description: "Battery drains overnight",
    dateCreated: "2024-01-14",
    assignedTo: "Sarah Electrician",
    estimatedCompletion: "2024-01-16",
  },
  {
    id: "JC003",
    vehicleId: "3",
    vehicleName: "Isuzu NPR",
    status: "pending_parts",
    priority: "critical",
    department: "mechanical",
    description: "Transmission slipping",
    dateCreated: "2024-01-12",
    assignedTo: "Mike Transmission",
    estimatedCompletion: "2024-01-19",
  },
  {
    id: "JC004",
    vehicleId: "1",
    vehicleName: "Ford Transit",
    status: "completed",
    priority: "low",
    department: "tires",
    description: "Regular tire rotation and balance",
    dateCreated: "2024-01-10",
    assignedTo: "Tim Tire",
    estimatedCompletion: "2024-01-10",
  },
  {
    id: "JC005",
    vehicleId: "2",
    vehicleName: "Mercedes Sprinter",
    status: "open",
    priority: "medium",
    department: "body",
    description: "Dent repair on right panel",
    dateCreated: "2024-01-15",
    assignedTo: "Peter Panel",
    estimatedCompletion: "2024-01-20",
  },
];

const JobCardManagement: React.FC = () => {
  const [jobCards, setJobCards] = useState<JobCard[]>(mockJobCards);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const openModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedVehicle(null), 300); // Reset selected vehicle after animation
  };

  const handleSubmitJobCard = (jobCardData: any) => {
    console.log("Job Card Submitted:", jobCardData);
    closeModal();
  };

  const filteredJobCards = jobCards.filter((card) => {
    if (
      selectedDepartment !== "all" &&
      card.department !== selectedDepartment
    ) {
      return false;
    }
    if (selectedStatus !== "all" && card.status !== selectedStatus) {
      return false;
    }
    if (
      searchQuery &&
      !card.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !card.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending_parts":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Job Card Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage all vehicle maintenance and repair jobs
          </p>
        </div>
        <button
          onClick={() =>
            openModal({
              id: "1",
              make: "Ford",
              model: "Transit",
              year: 2022,
              vin: "WBA3A5G59DNP26082",
              mileage: 45000,
              status: "maintenance",
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Job Card</span>
        </button>
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
                placeholder="Search job cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Department filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="mechanical">Mechanical</option>
              <option value="electrical">Electrical</option>
              <option value="body">Body Shop</option>
              <option value="tires">Tires</option>
              <option value="welding">Welding</option>
            </select>

            {/* Status filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="pending_parts">Pending Parts</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Job ID</th>
              <th className="py-3 px-4 text-left font-medium">Vehicle</th>
              <th className="py-3 px-4 text-left font-medium">Department</th>
              <th className="py-3 px-4 text-left font-medium">Priority</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">Created</th>
              <th className="py-3 px-4 text-left font-medium">
                Est. Completion
              </th>
              <th className="py-3 px-4 text-left font-medium">Assigned To</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredJobCards.map((card) => (
              <tr key={card.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{card.id}</td>
                <td className="py-3 px-4">{card.vehicleName}</td>
                <td className="py-3 px-4 capitalize">{card.department}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize ${getPriorityBadgeClass(
                      card.priority
                    )}`}
                  >
                    {card.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
                      card.status
                    )}`}
                  >
                    {formatStatus(card.status)}
                  </span>
                </td>
                <td className="py-3 px-4">{card.dateCreated}</td>
                <td className="py-3 px-4">{card.estimatedCompletion}</td>
                <td className="py-3 px-4">{card.assignedTo}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-md hover:bg-blue-50 text-blue-600">
                      <Wrench className="w-5 h-5" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-green-50 text-green-600">
                      <Check className="w-5 h-5" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-yellow-50 text-yellow-600">
                      <Clock className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredJobCards.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No job cards found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter criteria.
          </p>
        </div>
      )}

      {/* Render the JobCardModal */}
      {showModal && (
        <JobCardModal
          vehicle={selectedVehicle}
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleSubmitJobCard}
        />
      )}
    </div>
  );
};

export default JobCardManagement;
