import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Check,
  FileText,
  Truck,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

// Define the Part type
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

// Sample data
const mockParts: Part[] = [
  {
    id: "P001",
    name: "Oil Filter",
    partNumber: "OF-123456",
    category: "Filters",
    quantity: 32,
    minQuantity: 10,
    supplier: "AutoParts Inc",
    unitPrice: 8.99,
    location: "Shelf A3",
    lastOrdered: "2024-01-05",
  },
  {
    id: "P002",
    name: "Brake Pad Set",
    partNumber: "BP-789012",
    category: "Brakes",
    quantity: 8,
    minQuantity: 5,
    supplier: "BrakeMasters Co",
    unitPrice: 45.5,
    location: "Shelf B2",
    lastOrdered: "2024-01-12",
  },
  {
    id: "P003",
    name: "Serpentine Belt",
    partNumber: "SB-345678",
    category: "Belts",
    quantity: 3,
    minQuantity: 4,
    supplier: "AutoParts Inc",
    unitPrice: 22.75,
    location: "Shelf C1",
    lastOrdered: "2023-12-28",
  },
  {
    id: "P004",
    name: "Headlight Bulb",
    partNumber: "HL-901234",
    category: "Electrical",
    quantity: 15,
    minQuantity: 8,
    supplier: "LightBright Suppliers",
    unitPrice: 12.25,
    location: "Shelf D4",
    lastOrdered: "2024-01-08",
  },
  {
    id: "P005",
    name: "Air Filter",
    partNumber: "AF-567890",
    category: "Filters",
    quantity: 22,
    minQuantity: 10,
    supplier: "CleanAir Systems",
    unitPrice: 14.99,
    location: "Shelf A4",
    lastOrdered: "2024-01-10",
  },
];

const PartsInventory: React.FC = () => {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSupplier, setSelectedSupplier] = useState<string>("all");
  const [showLowStock, setShowLowStock] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [showIssueModal, setShowIssueModal] = useState<boolean>(false);

  // Extract unique categories and suppliers for filters
  const categories = ["all", ...new Set(parts.map((part) => part.category))];
  const suppliers = ["all", ...new Set(parts.map((part) => part.supplier))];

  // Filter parts based on selected criteria
  const filteredParts = parts.filter((part) => {
    if (selectedCategory !== "all" && part.category !== selectedCategory) {
      return false;
    }
    if (selectedSupplier !== "all" && part.supplier !== selectedSupplier) {
      return false;
    }
    if (showLowStock && part.quantity > part.minQuantity) {
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

  const totalValue = filteredParts.reduce(
    (sum, part) => sum + part.quantity * part.unitPrice,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Parts Inventory Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track parts availability, usage, and purchase history
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Part</span>
          </button>
          <button
            onClick={() => setShowOrderModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span>New Purchase Order</span>
          </button>
          <button
            onClick={() => setShowIssueModal(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
          >
            <ArrowUpCircle className="w-4 h-4" />
            <span>Issue Parts</span>
          </button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="text-blue-500" />
            <h3 className="text-lg font-medium">Total Parts</h3>
          </div>
          <p className="text-3xl font-bold">{filteredParts.length}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {parts.length} total in inventory
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="text-red-500" />
            <h3 className="text-lg font-medium">Low Stock Items</h3>
          </div>
          <p className="text-3xl font-bold">
            {parts.filter((p) => p.quantity <= p.minQuantity).length}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Below minimum quantity threshold
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="text-green-500" />
            <h3 className="text-lg font-medium">Inventory Value</h3>
          </div>
          <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Total value of current inventory
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="font-medium text-gray-800 dark:text-white">
              Filters
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories
                .filter((cat) => cat !== "all")
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>

            {/* Supplier filter */}
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="all">All Suppliers</option>
              {suppliers
                .filter((sup) => sup !== "all")
                .map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
            </select>

            {/* Low stock checkbox */}
            <label className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
              <input
                type="checkbox"
                className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                checked={showLowStock}
                onChange={() => setShowLowStock(!showLowStock)}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Low Stock Only
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Parts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Part ID</th>
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Part Number</th>
              <th className="py-3 px-4 text-left font-medium">Category</th>
              <th className="py-3 px-4 text-left font-medium">Quantity</th>
              <th className="py-3 px-4 text-left font-medium">Min. Quantity</th>
              <th className="py-3 px-4 text-left font-medium">Supplier</th>
              <th className="py-3 px-4 text-left font-medium">Unit Price</th>
              <th className="py-3 px-4 text-left font-medium">Location</th>
              <th className="py-3 px-4 text-left font-medium">Last Ordered</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredParts.map((part) => (
              <tr
                key={part.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {part.id}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200 font-medium">
                  {part.name}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {part.partNumber}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {part.category}
                </td>
                <td
                  className={`py-3 px-4 font-medium ${
                    part.quantity <= part.minQuantity
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {part.quantity}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {part.minQuantity}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {part.supplier}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  ${part.unitPrice.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {part.location}
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {part.lastOrdered}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400">
                      <ArrowDownCircle className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            No parts found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try changing your search or filter criteria.
          </p>
        </div>
      )}

      {/* Add additional modals for add part, purchase order, issue parts, etc. */}
      {/* These would be implemented as separate components */}
    </div>
  );
};

export default PartsInventory;
