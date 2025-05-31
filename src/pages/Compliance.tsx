import React, { useState } from "react";
import {
  Check,
  XCircle,
  AlertCircle,
  AlertTriangle,
  FileText,
  FileCheck,
  Calendar,
} from "lucide-react";

interface ComplianceItem {
  id: string;
  name: string;
  type: string;
  status: "compliant" | "non-compliant" | "expiring" | "pending";
  expirationDate?: string;
  documentUrl?: string;
}

const Compliance: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const complianceItems: ComplianceItem[] = [
    {
      id: "1",
      name: "Vehicle Registration - Ford Transit",
      type: "registration",
      status: "compliant",
      expirationDate: "2024-12-15",
    },
    {
      id: "2",
      name: "Driver License - John Doe",
      type: "license",
      status: "expiring",
      expirationDate: "2024-02-10",
    },
    {
      id: "3",
      name: "Insurance Certificate",
      type: "insurance",
      status: "compliant",
      expirationDate: "2024-09-22",
    },
    {
      id: "4",
      name: "DOT Inspection - Mercedes Sprinter",
      type: "inspection",
      status: "non-compliant",
      expirationDate: "2023-12-30",
    },
    {
      id: "5",
      name: "Maintenance Records - Isuzu NPR",
      type: "maintenance",
      status: "pending",
    },
    {
      id: "6",
      name: "Driver Hours Compliance",
      type: "hours",
      status: "compliant",
    },
    {
      id: "7",
      name: "Emission Test - Ford Transit",
      type: "emission",
      status: "expiring",
      expirationDate: "2024-02-28",
    },
    {
      id: "8",
      name: "Insurance Certificate - Cargo",
      type: "insurance",
      status: "compliant",
      expirationDate: "2024-11-15",
    },
  ];

  const filteredItems =
    filter === "all"
      ? complianceItems
      : complianceItems.filter((item) => item.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <Check className="w-5 h-5 text-green-500" />;
      case "non-compliant":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "expiring":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            Compliant
          </span>
        );
      case "non-compliant":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
            Non-Compliant
          </span>
        );
      case "expiring":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
            Expiring Soon
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            Pending Review
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Compliance & Documents
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Upload Document
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Documents
          </button>
          <button
            onClick={() => setFilter("compliant")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "compliant"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Compliant
          </button>
          <button
            onClick={() => setFilter("non-compliant")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "non-compliant"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Non-Compliant
          </button>
          <button
            onClick={() => setFilter("expiring")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "expiring"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Expiring Soon
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending Review
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 text-gray-600 text-sm leading-normal">
              <tr>
                <th className="py-3 px-4 text-left">Document Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Expiration Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    {item.name}
                  </td>
                  <td className="py-3 px-4 capitalize">{item.type}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      {getStatusBadge(item.status)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {item.expirationDate ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {item.expirationDate}
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800">
                        View
                      </button>
                      <button className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800">
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No compliance documents found matching the selected filter.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium">Expiring Soon</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Documents that require attention in the next 30 days.
          </p>
          <div className="space-y-4">
            {complianceItems
              .filter((item) => item.status === "expiring")
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Expires: {item.expirationDate}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Renew
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-medium">Non-Compliant</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Documents that need immediate attention.
          </p>
          <div className="space-y-4">
            {complianceItems
              .filter((item) => item.status === "non-compliant")
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Expired: {item.expirationDate}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Fix Now
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Document Templates</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Download and use standardized document templates.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>Vehicle Inspection Form</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Download
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>Driver Compliance Checklist</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Download
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>Maintenance Log Template</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
