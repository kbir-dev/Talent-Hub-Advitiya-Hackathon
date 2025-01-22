import { useState, useEffect } from "react"
import TalentCard from "./TalentCard"
import api from "../services/api"

function ViewTalents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [talents, setTalents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await api.getApprovedTalents();
        setTalents(response.talents || []);
      } catch (error) {
        console.error("Error fetching talents:", error);
        setError("Failed to fetch talents");
        setTalents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  const filteredTalents = talents?.filter((talent) => 
    talent.skills.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Discover Top Talent
          </span>
        </h1>
        <p className="text-gray-600 mb-8">
          Find the perfect talent for your next project from our curated pool of professionals
        </p>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <svg 
            className="absolute right-4 top-4 h-6 w-6 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {talents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No approved talents available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTalents.map((talent) => (
            <TalentCard key={talent._id} talent={talent} />
          ))}
        </div>
      )}

      {talents.length > 0 && filteredTalents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No talents found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ViewTalents

