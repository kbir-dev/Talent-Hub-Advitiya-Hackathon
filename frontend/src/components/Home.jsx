import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 transform -skew-y-6 origin-top-left"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Connect with Top Talent
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Talent Hub bridges the gap between exceptional talent and innovative opportunities. 
              Whether you're showcasing skills or seeking expertise, start your journey here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register-talent"
                className="px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Join as Talent
              </Link>
              <Link
                to="/register-client"
                className="px-8 py-4 rounded-full bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Diverse Talent Pool</h3>
            <p className="text-gray-600">Access a wide range of skilled professionals across various domains.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Profiles</h3>
            <p className="text-gray-600">All talents are thoroughly vetted to ensure quality and reliability.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quick Hiring</h3>
            <p className="text-gray-600">Streamlined process to connect and hire talent efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

