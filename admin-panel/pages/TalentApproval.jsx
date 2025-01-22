import { useEffect, useState } from "react";
import TalentCard from "../components/TalentCard";
import axios from "axios";
import { Users } from "lucide-react";

function TalentApproval() {
  const [talentRequests, setTalentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTalentRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/talent/pending");
      setTalentRequests(response.data.talents);
      setError(null);
    } catch (error) {
      console.error("Error fetching talent requests:", error);
      setError("Failed to load talent requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalentRequests();
  }, []);

  const handleRemoveCard = (talentId) => {
    setTalentRequests(prevRequests => 
      prevRequests.filter(talent => talent._id !== talentId)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-600">
        <p className="mb-4">{error}</p>
        <button 
          onClick={fetchTalentRequests}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Talent Approvals</h1>
            <p className="text-sm text-gray-500">Manage pending talent registration requests</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {talentRequests.length} Pending
          </span>
        </div>
      </div>

      {talentRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Pending Requests</h3>
          <p className="text-gray-500 mt-2">All talent registration requests have been processed</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {talentRequests.map((talent) => (
            <TalentCard 
              key={talent._id}
              talent={talent}
              onRemoveCard={handleRemoveCard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TalentApproval;