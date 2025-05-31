import React, { useState, useEffect } from "react";
import api from "../services/api";
import { formatDate, formatCurrency } from "../utils/helpers";
import { BarChart3, Calendar, Download, Filter } from "lucide-react";

const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<string>("fleet");
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2024-01-31");
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        let data;
        switch (activeReport) {
          case "fleet":
            data = await api.reports.getFleetUtilization(startDate, endDate);
            break;
          case "fuel":
            data = await api.reports.getFuelConsumption(startDate, endDate);
            break;
          case "maintenance":
            data = await api.reports.getMaintenanceCosts(startDate, endDate);
            break;
          default:
            data = await api.reports.getFleetUtilization(startDate, endDate);
        }
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [activeReport, startDate, endDate]);

  const reportTypes = [
    { id: "fleet", name: "Fleet Utilization" },
    { id: "fuel", name: "Fuel Consumption" },
    { id: "maintenance", name: "Maintenance Costs" },
    { id: "driver", name: "Driver Performance" },
    { id: "compliance", name: "Compliance Status" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Reports & Analytics
        </h1>
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeReport === report.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {report.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Date Range:</span>
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : reportData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeReport === "fleet" && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Vehicles</p>
                    <p className="text-2xl font-bold">
                      {reportData.totalVehicles}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Active Vehicles</p>
                    <p className="text-2xl font-bold">
                      {reportData.activeVehicles}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Utilization Rate</p>
                    <p className="text-2xl font-bold">
                      {reportData.utilizationRate * 100}%
                    </p>
                  </div>
                </>
              )}

              {activeReport === "fuel" && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Consumption</p>
                    <p className="text-2xl font-bold">
                      {reportData.totalConsumption} gal
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average MPG</p>
                    <p className="text-2xl font-bold">
                      {reportData.averageMpg}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Cost Per Mile</p>
                    <p className="text-2xl font-bold">
                      ${reportData.costPerMile}
                    </p>
                  </div>
                </>
              )}

              {activeReport === "maintenance" && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Costs</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(reportData.totalCost)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      Preventative Maintenance
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(reportData.preventativeCost)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Repairs</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(reportData.repairCost)}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Report Visualization
                </h3>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500 text-sm">Chart View</span>
                </div>
              </div>

              <div className="h-80 bg-gray-50 rounded-md flex justify-center items-center">
                {/* Chart would be rendered here with a chart library */}
                <p className="text-gray-500">
                  Chart visualization for the selected report
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No report data available for the selected criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
