import React, { useState } from "react";
import {
  UserCog,
  Users as UsersIcon,
  UserPlus,
  MoreHorizontal,
  Mail,
  Phone,
  Shield,
  Search,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "administrator" | "manager" | "dispatcher" | "driver" | "maintenance";
  status: "active" | "inactive";
  phone: string;
  lastLogin: string;
}

const Users: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@fleetpro.com",
      role: "administrator",
      status: "active",
      phone: "+1-555-0123",
      lastLogin: "2024-01-15T09:30:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@fleetpro.com",
      role: "manager",
      status: "active",
      phone: "+1-555-0124",
      lastLogin: "2024-01-14T16:45:00Z",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@fleetpro.com",
      role: "dispatcher",
      status: "active",
      phone: "+1-555-0125",
      lastLogin: "2024-01-15T08:15:00Z",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@fleetpro.com",
      role: "driver",
      status: "active",
      phone: "+1-555-0126",
      lastLogin: "2024-01-13T11:20:00Z",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@fleetpro.com",
      role: "maintenance",
      status: "active",
      phone: "+1-555-0127",
      lastLogin: "2024-01-14T14:10:00Z",
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.davis@fleetpro.com",
      role: "manager",
      status: "inactive",
      phone: "+1-555-0128",
      lastLogin: "2023-12-28T10:05:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "administrator":
        return "bg-purple-100 text-purple-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "dispatcher":
        return "bg-green-100 text-green-800";
      case "driver":
        return "bg-amber-100 text-amber-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <UsersIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <UsersIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.status === "active").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Administrators</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === "administrator").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <UserCog className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Drivers</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === "driver").length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-4 mb-6 justify-between">
          <div className="flex items-center relative w-64">
            <Search className="w-4 h-4 absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Roles</option>
              <option value="administrator">Administrator</option>
              <option value="manager">Manager</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="driver">Driver</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 text-gray-600 text-sm leading-normal">
              <tr>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Last Login</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs capitalize ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Mail className="w-3 h-3" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{formatDate(user.lastLogin)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800">
                        Edit
                      </button>
                      <button className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800">
                        Reset Password
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found matching the selected criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
