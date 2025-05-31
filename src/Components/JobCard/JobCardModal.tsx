import React, { useState } from "react";
import { Vehicle } from "../../models/types";

interface JobCardModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobCardData: any) => void;
}

const JobCardModal: React.FC<JobCardModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [jobType, setJobType] = useState("scheduled");
  const [description, setDescription] = useState("");
  const [technicianAssigned, setTechnicianAssigned] = useState("");
  const [dateIn, setDateIn] = useState(new Date().toISOString().split("T")[0]);
  const [dateOut, setDateOut] = useState("");
  const [odometer, setOdometer] = useState(vehicle?.mileage.toString() || "");

  if (!isOpen || !vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      vehicleId: vehicle.id,
      jobType,
      description,
      technicianAssigned,
      dateIn,
      dateOut,
      odometer: parseInt(odometer),
      status: "open",
      tasks: [],
      parts: [],
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Clicking outside the modal will close it
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Job Card</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-medium">Vehicle:</span> {vehicle.make}{" "}
            {vehicle.model} ({vehicle.year})
          </p>
          <p className="text-gray-600">
            <span className="font-medium">VIN:</span> {vehicle.vin}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="scheduled">Scheduled</option>
                <option value="emergency">Emergency</option>
                <option value="breakdown">Breakdown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned Technician
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={technicianAssigned}
                onChange={(e) => setTechnicianAssigned(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date In
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={dateIn}
                onChange={(e) => setDateIn(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Date Out
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={dateOut}
                onChange={(e) => setDateOut(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Odometer Reading
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description of Work
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Job Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCardModal;
