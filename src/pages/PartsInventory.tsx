import React, { useState } from "react";
import {
  Package,
  Search,
  AlertTriangle,
  Plus,
  Filter,
  RefreshCw,
} from "lucide-react";

interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  quantity: number;
  minQuantity: number;
  supplier: string;
  unitPrice: number;
  location: string;
  lastOrdered: string;
}

const mockParts: Part[] = [
  {
    id: "P001",
    name: "Oil Filter",
    partNumber: "OF-12345",
    category: "Filters",
    quantity: 15,
    minQuantity: 5,
    supplier: "Auto Parts Co",
    unitPrice: 12.99,
    location: "Shelf A3",
    lastOrdered: "2023-12-10",
  },
  {
    id: "P002",
    name: "Brake Pad Set",
    partNumber: "BP-67890",
    category: "Brakes",
    quantity: 3,
    minQuantity: 4,
    supplier: "Brake Masters",
    unitPrice: 45.5,
    location: "Shelf B2",
    lastOrdered: "2023-12-15",
  },
  {
    id: "P003",
    name: "Air Filter",
    partNumber: "AF-54321",
    category: "Filters",
    quantity: 8,
    minQuantity: 3,
    supplier: "Auto Parts Co",
    unitPrice: 18.75,
    location: "Shelf A4",
    lastOrdered: "2023-12-05",
  },
  {
    id: "P004",
    name: "Spark Plug Set",
    partNumber: "SP-11122",
    category: "Ignition",
    quantity: 1,
    minQuantity: 2,
    supplier: "ElectroParts Inc",
    unitPrice: 32.99,
    location: "Shelf C1",
    lastOrdered: "2023-11-20",
  },
  {
    id: "P005",
    name: "Windshield Wiper Blades",
    partNumber: "WW-33445",
    category: "Exterior",
    quantity: 6,
    minQuantity: 5,
    supplier: "Clear View Parts",
    unitPrice: 24.5,
    location: "Shelf D3",
    lastOrdered: "2024-01-05",
  },
];

const PartsInventory: React.FC = () => {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showLowStock, setShowLowStock] = useState<boolean>(false);

  const filteredParts = parts.filter((part) => {
    if (selectedCategory !== "all" && part.category !== selectedCategory) {
      return false;
    }
    if (showLowStock && part.quantity >= part.minQuantity) {
      return false;
    }
    if (
      searchQuery &&
      !part.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !part.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const categories = Array.from(new Set(parts.map((part) => part.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Parts Inventory</h1>
          <p className="text-gray-500 mt-1">
            Manage and track parts for vehicle maintenance
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Update Inventory</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add New Part</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">Total Parts</h3>
          <p className="text-3xl font-bold mt-2">{parts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">
            Low Stock Items
          </h3>
          <p className="text-3xl font-bold mt-2 text-amber-600">
            {parts.filter((part) => part.quantity < part.minQuantity).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">Categories</h3>
          <p className="text-3xl font-bold mt-2">{categories.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600">Total Value</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            $
            {parts
              .reduce((sum, part) => sum + part.quantity * part.unitPrice, 0)
              .toFixed(2)}
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
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Low stock filter */}
            <label className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md">
              <input
                type="checkbox"
                checked={showLowStock}
                onChange={(e) => setShowLowStock(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>Show Low Stock Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Parts List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Part #</th>
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Category</th>
              <th className="py-3 px-4 text-left font-medium">Quantity</th>
              <th className="py-3 px-4 text-left font-medium">Unit Price</th>
              <th className="py-3 px-4 text-left font-medium">Total Value</th>
              <th className="py-3 px-4 text-left font-medium">Location</th>
              <th className="py-3 px-4 text-left font-medium">Supplier</th>
              <th className="py-3 px-4 text-left font-medium">Last Ordered</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredParts.map((part) => (
              <tr key={part.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{part.partNumber}</td>
                <td className="py-3 px-4 font-medium">{part.name}</td>
                <td className="py-3 px-4">{part.category}</td>
                <td className="py-3 px-4">
                  <span
                    className={`font-medium ${
                      part.quantity < part.minQuantity ? "text-red-600" : ""
                    }`}
                  >
                    {part.quantity}
                  </span>
                </td>
                <td className="py-3 px-4">${part.unitPrice.toFixed(2)}</td>
                <td className="py-3 px-4">
                  ${(part.quantity * part.unitPrice).toFixed(2)}
                </td>
                <td className="py-3 px-4">{part.location}</td>
                <td className="py-3 px-4">{part.supplier}</td>
                <td className="py-3 px-4">{part.lastOrdered}</td>
                <td className="py-3 px-4">
                  {part.quantity < part.minQuantity ? (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span>Low Stock</span>
                    </div>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No parts found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default PartsInventory;
