import React from "react";

interface JobCard {
  id: string;
  vehicleId: string;
  jobType: string;
  dateIn: string;
  status: "open" | "in-progress" | "completed" | "closed";
  technicianAssigned: string;
}

interface JobCardListProps {
  jobCards: JobCard[];
  onViewDetails: (jobCard: JobCard) => void;
  onEdit: (jobCard: JobCard) => void;
}

const JobCardList: React.FC<JobCardListProps> = ({
  jobCards,
  onViewDetails,
  onEdit,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="py-3 px-4 text-left font-medium">ID</th>
            <th className="py-3 px-4 text-left font-medium">Vehicle</th>
            <th className="py-3 px-4 text-left font-medium">Type</th>
            <th className="py-3 px-4 text-left font-medium">Date In</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Technician</th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobCards.length > 0 ? (
            jobCards.map((jobCard) => (
              <tr key={jobCard.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{jobCard.id}</td>
                <td className="py-3 px-4">{jobCard.vehicleId}</td>
                <td className="py-3 px-4 capitalize">{jobCard.jobType}</td>
                <td className="py-3 px-4">{jobCard.dateIn}</td>
                <td className="py-3 px-4 capitalize">{jobCard.status}</td>
                <td className="py-3 px-4">{jobCard.technicianAssigned}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewDetails(jobCard)}
                      className="p-1 rounded-md hover:bg-blue-50 text-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(jobCard)}
                      className="p-1 rounded-md hover:bg-green-50 text-green-600"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                No job cards found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobCardList;
