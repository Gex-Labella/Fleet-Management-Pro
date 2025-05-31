import React from "react";
import {
  Car,
  Wrench,
  Clock,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const FleetSummary: React.FC = () => {
  const { vehicles } = useAppContext();

  // Calculate summary statistics
  const activeVehicles = vehicles.filter((v) => v.status === "active").length;
  const maintenanceVehicles = vehicles.filter(
    (v) => v.status === "maintenance"
  ).length;
  const inactiveVehicles = vehicles.filter(
    (v) => v.status === "inactive"
  ).length;

  // Mileage calculations
  const totalMileage = vehicles.reduce((sum, v) => sum + v.mileage, 0);
  const averageMileage = Math.round(totalMileage / vehicles.length);

  // Mock data for trends (would come from API in a real app)
  const fleetGrowth = 8.5; // percent
  const maintenanceIncrease = 12.3; // percent
  const mileageChange = -3.7; // percent

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Fleet Summary</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            {fleetGrowth >= 0 ? (
              <>
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500">{fleetGrowth}% increase</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-red-500">
                  {Math.abs(fleetGrowth)}% decrease
                </span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeVehicles}
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>
              {((activeVehicles / vehicles.length) * 100).toFixed(1)}% of total
              fleet
            </span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">In Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {maintenanceVehicles}
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Wrench className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            {maintenanceIncrease >= 0 ? (
              <>
                <TrendingUp className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-red-500">
                  {maintenanceIncrease}% increase
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500">
                  {Math.abs(maintenanceIncrease)}% decrease
                </span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Avg. Mileage</p>
              <p className="text-2xl font-bold text-gray-900">
                {averageMileage.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            {mileageChange >= 0 ? (
              <>
                <TrendingUp className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-red-500">{mileageChange}% increase</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500">
                  {Math.abs(mileageChange)}% decrease
                </span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fleet Health</h3>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500"
            style={{ width: `\${(activeVehicles / vehicles.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>
            Health Score: {Math.round((activeVehicles / vehicles.length) * 100)}
            %
          </span>
          {maintenanceVehicles > 0 && (
            <span className="flex items-center text-amber-600">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {maintenanceVehicles}{" "}
              {maintenanceVehicles === 1 ? "vehicle" : "vehicles"} need
              attention
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetSummary;
