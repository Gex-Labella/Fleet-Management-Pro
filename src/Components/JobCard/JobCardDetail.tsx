import React from "react";

interface JobCardDetailProps {
  jobCard: {
    id: string;
    vehicleId: string;
    jobType: string;
    dateIn: string;
    status: "open" | "in-progress" | "completed" | "closed";
    technicianAssigned: string;
  };
  onClose: () => void;
}

const JobCardDetail: React.FC<JobCardDetailProps> = ({ jobCard, onClose }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Job Card Details</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium text-gray-600">ID:</span> {jobCard.id}
        </p>
        <p>
          <span className="font-medium text-gray-600">Vehicle ID:</span>{" "}
          {jobCard.vehicleId}
        </p>
        <p>
          <span className="font-medium text-gray-600">Job Type:</span>{" "}
          {jobCard.jobType}
        </p>
        <p>
          <span className="font-medium text-gray-600">Date In:</span>{" "}
          {jobCard.dateIn}
        </p>
        <p>
          <span className="font-medium text-gray-600">Status:</span>{" "}
          {jobCard.status}
        </p>
        <p>
          <span className="font-medium text-gray-600">
            Technician Assigned:
          </span>{" "}
          {jobCard.technicianAssigned}
        </p>
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  );
};

export default JobCardDetail;
