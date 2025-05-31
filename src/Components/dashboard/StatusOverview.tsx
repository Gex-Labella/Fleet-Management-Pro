import React from "react";
import { MapPin, Calendar, ArrowRight, ArrowUpRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { formatDate } from "../../utils/helpers";

const StatusOverview: React.FC = () => {
  const { trips, vehicles, drivers } = useAppContext();

  // Find active trips
  const activeTrips = trips.filter((trip) => trip.status === "active");
  const scheduledTrips = trips.filter((trip) => trip.status === "scheduled");

  // Calculate statistics
  const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
  const activeVehiclesCount = vehicles.filter(
    (v) => v.status === "active"
  ).length;
  const activeDriversCount = drivers.filter(
    (d) => d.status === "active"
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Status Overview</h2>
        <div className="text-sm text-blue-600">
          <span className="font-medium">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </span>
          <span className="text-gray-500 ml-2">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Active Trips
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {activeTrips.length}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {activeVehiclesCount} vehicles on the road
            </span>
            <span className="text-xs text-blue-600 flex items-center">
              View <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Available Drivers
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {activeDriversCount - activeTrips.length}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {activeDriversCount} active drivers
            </span>
            <span className="text-xs text-green-600 flex items-center">
              View <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Total Distance
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {totalDistance.toLocaleString()}{" "}
            <span className="text-sm font-normal">mi</span>
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {trips.length} total trips
            </span>
            <span className="text-xs text-purple-600 flex items-center">
              Details <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Upcoming Trips</h3>
          <span className="text-xs text-blue-600 flex items-center">
            Schedule Trip <ArrowUpRight className="w-3 h-3 ml-1" />
          </span>
        </div>

        {scheduledTrips.length > 0 ? (
          <div className="space-y-3">
            {scheduledTrips.slice(0, 3).map((trip) => {
              const vehicle = vehicles.find((v) => v.id === trip.vehicleId);
              const driver = drivers.find((d) => d.id === trip.driverId);

              return (
                <div
                  key={trip.id}
                  className="border border-gray-100 rounded-md p-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <h4 className="font-medium text-gray-800">
                          {trip.origin}{" "}
                          <ArrowRight className="w-3 h-3 mx-1 inline" />{" "}
                          {trip.destination}
                        </h4>
                      </div>

                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(trip.startTime)}</span>
                        <span className="mx-2">•</span>
                        <span>{trip.distance} miles</span>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <div className="font-medium">
                        {vehicle?.make} {vehicle?.model}
                      </div>
                      <div className="text-gray-500 mt-0.5">{driver?.name}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {scheduledTrips.length > 3 && (
              <div className="text-center text-sm text-blue-600 pt-2">
                + {scheduledTrips.length - 3} more scheduled trips
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 border border-dashed border-gray-200 rounded-md">
            No upcoming trips scheduled.
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusOverview;
