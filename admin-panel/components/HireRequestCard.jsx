import axios from "axios";
import { Check, X, User, Calendar } from "lucide-react";

function HireRequestCard({ request, onRequestUpdate }) {
  const handleStatusUpdate = async (status) => {
    try {
      await axios.put(
        `http://localhost:3000/api/talent/hire/${request._id}/status`,
        { status }
      );
      if (onRequestUpdate) onRequestUpdate();
    } catch (error) {
      console.error(`Error ${status} hire request:`, error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {request.clientId?.name || "Unknown Client"}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            
            <p className="mt-1 text-sm text-gray-500">
              wants to hire
            </p>
            
            <div className="mt-2">
              <h4 className="text-base font-medium text-gray-900">
                {request.talentId?.name || "Unknown Talent"}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {request.talentId?.skills}
              </p>
            </div>

            <div className="mt-3 flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {new Date(request.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button
          onClick={() => handleStatusUpdate("rejected")}
          className="inline-flex items-center px-4 py-2 border border-red-200 rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors duration-200"
        >
          <X className="w-4 h-4 mr-2" />
          Reject
        </button>
        
        <button
          onClick={() => handleStatusUpdate("approved")}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          <Check className="w-4 h-4 mr-2" />
          Approve
        </button>
      </div>
    </div>
  );
}

export default HireRequestCard;
