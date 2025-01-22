import { useState } from 'react';
import api from '../services/api';

function TalentCard({ talent }) {
  const [hiring, setHiring] = useState(false);
  const [error, setError] = useState("");

  const handleHire = async () => {
    const token = localStorage.getItem('token');
    const clientData = JSON.parse(localStorage.getItem('clientData'));

    if (!token || !clientData) {
      window.location.href = '/login';
      return;
    }

    try {
      setHiring(true);
      await api.createHireRequest({
        clientId: clientData.id,
        talentId: talent._id
      }, token);
      alert('Hire request sent successfully!');
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send hire request");
    } finally {
      setHiring(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={talent.profilePhoto || "/placeholder.svg"} 
              alt={talent.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-100" 
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {talent.name}
            </h2>
            <div className="flex items-center space-x-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{talent.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm">{talent.contactNumber}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {talent.skills.split(',').map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">About</h3>
            <p className="mt-2 text-gray-600 text-sm line-clamp-3">
              {talent.personalDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button 
          onClick={handleHire}
          disabled={hiring}
          className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400"
        >
          {hiring ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Hire Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TalentCard;
  
  