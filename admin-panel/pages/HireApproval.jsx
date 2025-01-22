import { useEffect, useState } from "react";
import HireRequestCard from "../components/HireRequestCard";
import axios from "axios";

function HireApproval() {
  const [hireRequests, setHireRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHireRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/talent/pending-hirerrequests");
      setHireRequests(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching hire requests:", error);
      setError("Failed to load hire requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHireRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading hire requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        <p>{error}</p>
        <button 
          onClick={fetchHireRequests}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hire Request Approval</h1>
        <button 
          onClick={fetchHireRequests}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
         </button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hireRequests.length > 0 ? (
          hireRequests.map((request) => (
            <HireRequestCard 
              key={request._id} 
              request={request} 
              onRequestUpdate={fetchHireRequests}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No pending hire requests available
          </div>
        )}
      </div>
    </div>
  );
}

export default HireApproval;