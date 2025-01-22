import { Link } from "react-router-dom"

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/75 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Talent Hub
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/view-talents" className="text-gray-600 hover:text-blue-600 transition-colors">
              Browse Talents
            </Link>
            <Link to="/register-talent" className="text-gray-600 hover:text-blue-600 transition-colors">
              Become a Talent
            </Link>
            <Link 
              to="/register-client" 
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Hire Talent
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

