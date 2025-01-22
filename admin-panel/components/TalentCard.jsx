import axios from "axios";
import { Check, X, Mail, Phone, User } from "lucide-react";

function TalentCard({ talent, onRemoveCard }) {
  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:3000/api/talent/approve/${talent._id}`);
      onRemoveCard(talent._id);
    } catch (error) {
      console.error("Error approving talent request:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/talent/remove/${talent._id}`);
      onRemoveCard(talent._id);
    } catch (error) {
      console.error("Error rejecting talent request:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={talent.profilePhoto || "/placeholder.svg"}
              alt={talent.name}
              className="h-20 w-20 rounded-full object-cover border-2 border-gray-100"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{talent.name}</h2>
            
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                <span className="truncate">{talent.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                <span>{talent.contactNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {talent.skills.split(',').map((skill) => (
              <span 
                key={skill.trim()} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
          
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {talent.personalDescription}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button
          onClick={handleReject}
          className="inline-flex items-center px-4 py-2 border border-red-200 rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors duration-200"
        >
          <X className="w-4 h-4 mr-2" />
          Reject
        </button>
        
        <button
          onClick={handleApprove}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          <Check className="w-4 h-4 mr-2" />
          Approve
        </button>
      </div>
    </div>
  );
}

export default TalentCard;