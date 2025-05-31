import React, { useState } from "react";

interface JobCardFormProps {
  initialData?: {
    id?: string;
    vehicleId: string;
    jobType: string;
    dateIn: string;
    status: "open" | "in-progress" | "completed" | "closed";
    technicianAssigned: string;
  };
  onSubmit: (data: {
    id?: string;
    vehicleId: string;
    jobType: string;
    dateIn: string;
    status: "open" | "in-progress" | "completed" | "closed";
    technicianAssigned: string;
  }) => void;
  onCancel?: () => void;
}

const JobCardForm: React.FC<JobCardFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    vehicleId: initialData?.vehicleId || "",
    jobType: initialData?.jobType || "",
    dateIn: initialData?.dateIn || "",
    status: initialData?.status || "open",
    technicianAssigned: initialData?.technicianAssigned || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Vehicle ID
        </label>
        <input
          type="text"
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Type
        </label>
        <input
          type="text"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date In
        </label>
        <input
          type="date"
          name="dateIn"
          value={formData.dateIn}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Technician Assigned
        </label>
        <input
          type="text"
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default JobCardForm;

<JobCardForm
  initialData={{
    vehicleId: "V123",
    jobType: "repair",
    dateIn: "2023-10-01",
    status: "open",
    technicianAssigned: "John Doe",
  }}
  onSubmit={(data) => console.log("Form submitted:", data)}
  onCancel={() => console.log("Form canceled")}
/>;
