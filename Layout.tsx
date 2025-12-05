import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, FileText, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { getUserSession, setUserSession } from '../services/storageService';
import { UserRole } from '../types';
import SOSButton from './SOSButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUserSession();
  const isAuthPage = location.pathname === '/login';

  const handleLogout = () => {
    setUserSession(null);
    navigate('/login');
  };

  if (isAuthPage) {
    return <main className="min-h-screen bg-red-50">{children}</main>;
  }

  const isAdmin = user?.role !== UserRole.USER;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
               src="https://upload.wikimedia.org/wikipedia/en/c/c2/Railway_Protection_Force_Logo.png" 
               alt="RPF Logo" 
               className="h-8 w-auto bg-white rounded-full p-0.5"
            />
            <h1 className="text-xl font-bold tracking-tight">RPF Shakti</h1>
          </div>
          <button 
             onClick={handleLogout}
             className="text-white/80 hover:text-white p-1"
             title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 pb-safe">
        <div className="flex justify-around items-center h-16">
          <NavItem to="/" icon={<Home size={22} />} label="Home" active={location.pathname === '/'} />
          
          {!isAdmin && (
             <NavItem to="/register" icon={<PlusCircle size={22} />} label="Register" active={location.pathname === '/register'} />
          )}
          
          <NavItem to={isAdmin ? "/admin" : "/track"} icon={<FileText size={22} />} label={isAdmin ? "Complaints" : "Track"} active={location.pathname === '/track' || location.pathname === '/admin'} />
          
          <NavItem to="/profile" icon={<UserIcon size={22} />} label="Profile" active={location.pathname === '/profile'} />
        </div>
      </nav>
      
      {/* Desktop warning (App is mobile first, but let's make it usable) */}
      <div className="hidden md:block fixed bottom-4 right-4 text-xs text-gray-400">
        Optimized for Mobile View
      </div>

      {!isAdmin && <SOSButton />}
    </div>
  );
};

const NavItem = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link to={to} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${active ? 'text-red-600' : 'text-gray-500 hover:text-red-400'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </Link>
);

export default Layout;