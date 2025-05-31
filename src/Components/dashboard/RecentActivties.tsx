import React from "react";
import {
  Calendar,
  Truck,
  Users,
  AlertTriangle,
  Wrench,
  Fuel,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { formatDate } from "../../utils/helpers";

interface Activity {
  id: string;
  type: "trip" | "maintenance" | "driver" | "fuel" | "alert";
  message: string;
  timestamp: string;
  vehicle?: string;
  driver?: string;
}

const RecentActivities: React.FC = () => {
  // Mock activities data (would come from API in a real app)
  const activities: Activity[] = [
    {
      id: "1",
      type: "trip",
      message: "Trip completed from New York to Boston",
      timestamp: "2024-01-15T08:30:00Z",
      vehicle: "Ford Transit",
      driver: "John Doe",
    },
    {
      id: "2",
      type: "maintenance",
      message: "Oil change completed",
      timestamp: "2024-01-14T15:45:00Z",
      vehicle: "Mercedes Sprinter",
    },
    {
      id: "3",
      type: "driver",
      message: "New driver assigned to vehicle",
      timestamp: "2024-01-14T10:20:00Z",
      vehicle: "Isuzu NPR",
      driver: "Jane Smith",
    },
    {
      id: "4",
      type: "alert",
      message: "Check engine light detected",
      timestamp: "2024-01-13T16:35:00Z",
      vehicle: "Ford Transit",
    },
    {
      id: "5",
      type: "fuel",
      message: "Fuel refill - 35 gallons",
      timestamp: "2024-01-13T09:15:00Z",
      vehicle: "Mercedes Sprinter",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "trip":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "maintenance":
        return <Wrench className="w-5 h-5 text-amber-600" />;
      case "driver":
        return <Users className="w-5 h-5 text-green-600" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "fuel":
        return <Fuel className="w-5 h-5 text-purple-600" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Recent Activities</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-grow min-w-0">
              <p className="text-sm text-gray-700 font-medium">
                {activity.message}
              </p>

              <div className="flex flex-wrap items-center mt-1 text-xs text-gray-500 gap-3">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{formatDate(activity.timestamp)}</span>
                </div>

                {activity.vehicle && (
                  <div className="flex items-center">
                    <Truck className="w-3 h-3 mr-1" />
                    <span>{activity.vehicle}</span>
                  </div>
                )}

                {activity.driver && (
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{activity.driver}</span>
                  </div>
                )}
              </div>
            </div>

            <button className="p-1 text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No recent activities to display.
        </div>
      )}
    </div>
  );
};

export default RecentActivities;
