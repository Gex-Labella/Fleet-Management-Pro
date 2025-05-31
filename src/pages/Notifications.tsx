import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Trash,
  Settings,
  RefreshCw,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "reminder" | "info" | "success";
  timestamp: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Vehicle Maintenance Required",
      message:
        "Ford Transit (VIN: WBA3A5G59DNP26082) is due for scheduled maintenance.",
      type: "alert",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
    },
    {
      id: "2",
      title: "Driver License Expiring",
      message: "John Doe's driver license will expire in 15 days.",
      type: "reminder",
      timestamp: "2024-01-14T09:45:00Z",
      read: false,
    },
    {
      id: "3",
      title: "Trip Completed",
      message: "Trip #283 has been successfully completed.",
      type: "success",
      timestamp: "2024-01-14T08:20:00Z",
      read: true,
    },
    {
      id: "4",
      title: "New Driver Assigned",
      message: "Jane Smith has been assigned to vehicle Mercedes Sprinter.",
      type: "info",
      timestamp: "2024-01-13T16:15:00Z",
      read: true,
    },
    {
      id: "5",
      title: "Fuel Level Low",
      message: "Isuzu NPR is running low on fuel (15% remaining).",
      type: "alert",
      timestamp: "2024-01-13T15:10:00Z",
      read: false,
    },
    {
      id: "6",
      title: "Insurance Renewal",
      message: "Fleet insurance policy will expire in 30 days.",
      type: "reminder",
      timestamp: "2024-01-12T11:25:00Z",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<string>("all");

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === filter);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "info":
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
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
        <h1 className="text-2xl font-bold text-gray-800">
          Notifications & Alerts
        </h1>
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium \${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-md text-sm font-medium \${
                  filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter("alert")}
                className={`px-4 py-2 rounded-md text-sm font-medium \${
                  filter === 'alert' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Alerts
              </button>
              <button
                onClick={() => setFilter("reminder")}
                className={`px-4 py-2 rounded-md text-sm font-medium \${
                  filter === 'reminder' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reminders
              </button>
              <button
                onClick={() => setFilter("info")}
                className={`px-4 py-2 rounded-md text-sm font-medium \${
                  filter === 'info' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Info
              </button>
            </div>

            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-4 rounded-lg \${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                  >
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3
                          className={`text-base font-medium \${notification.read ? 'text-gray-800' : 'text-blue-800'}`}
                        >
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p
                        className={`text-sm \${notification.read ? 'text-gray-600' : 'text-blue-600'}`}
                      >
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No notifications found matching the selected filter.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium">Notification Summary</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">All Notifications</span>
                <span className="text-lg font-medium">
                  {notifications.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unread</span>
                <span className="text-lg font-medium">
                  {notifications.filter((n) => !n.read).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Alerts</span>
                <span className="text-lg font-medium">
                  {notifications.filter((n) => n.type === "alert").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reminders</span>
                <span className="text-lg font-medium">
                  {notifications.filter((n) => n.type === "reminder").length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium">Recent Activities</h3>
            </div>
            <div className="space-y-4">
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Jan 15, 2024</span>
                </div>
                <p className="ml-6 mt-1 text-gray-700">3 vehicles serviced</p>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Jan 14, 2024</span>
                </div>
                <p className="ml-6 mt-1 text-gray-700">
                  2 new drivers onboarded
                </p>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Jan 13, 2024</span>
                </div>
                <p className="ml-6 mt-1 text-gray-700">5 trips completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
