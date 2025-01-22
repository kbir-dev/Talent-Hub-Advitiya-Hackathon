import { Link, useLocation } from "react-router-dom"
import { Users, Briefcase, LayoutDashboard } from "lucide-react"

function Sidebar() {
  const location = useLocation();
  
  const isActiveRoute = (path) => location.pathname === path;

  const menuItems = [
    {
      path: "/talent-approval",
      name: "Talent Approvals",
      icon: Users,
    },
    {
      path: "/hire-approval",
      name: "Hire Requests",
      icon: Briefcase,
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="flex items-center gap-2 p-6 border-b border-gray-200">
        <LayoutDashboard className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-500">Talent Hub Management</p>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

