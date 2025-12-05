import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, BookOpen, Bell } from 'lucide-react';
import { getUserSession } from '../services/storageService';
import { UserRole } from '../types';

const Home: React.FC = () => {
  const user = getUserSession();
  
  // If admin, redirect to admin dashboard (simple check)
  if (user && user.role !== UserRole.USER) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
        <p className="text-gray-500 mb-6">Please proceed to the admin dashboard.</p>
        <Link to="/admin" className="bg-red-700 text-white px-6 py-2 rounded-lg">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-red-100 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-800">Welcome,</h2>
          <p className="text-red-600 font-semibold text-lg">{user?.name}</p>
          <p className="text-gray-500 text-sm mt-1">{user?.unit}</p>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
             <img 
               src="https://upload.wikimedia.org/wikipedia/en/c/c2/Railway_Protection_Force_Logo.png" 
               alt="RPF Logo" 
               className="h-40 w-40 object-contain"
            />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <QuickAction 
          to="/register" 
          icon={<PlusCircle className="text-white" size={28} />} 
          label="New Complaint" 
          color="bg-red-500" 
        />
        <QuickAction 
          to="/track" 
          icon={<FileText className="text-white" size={28} />} 
          label="Track Status" 
          color="bg-orange-400" 
        />
        <QuickAction 
          to="/resources" 
          icon={<BookOpen className="text-white" size={28} />} 
          label="Resources" 
          color="bg-blue-500" 
        />
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-2">
            <Bell size={28} className="text-gray-400" />
            <span className="font-medium text-gray-600 text-sm">Notifications</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Recent Updates</h3>
          <Link to="/track" className="text-xs text-red-600 font-medium">View All</Link>
        </div>
        <div className="space-y-4">
            {/* Mock updates if no real data */}
            <div className="flex gap-3 items-start border-l-2 border-green-500 pl-3 py-1">
                <div>
                    <p className="text-sm font-medium text-gray-800">Complaint #RPF-X92 Resolved</p>
                    <p className="text-xs text-gray-500">Your complaint regarding duty roster has been closed.</p>
                </div>
            </div>
            <div className="flex gap-3 items-start border-l-2 border-yellow-500 pl-3 py-1">
                <div>
                    <p className="text-sm font-medium text-gray-800">Safety Advisory</p>
                    <p className="text-xs text-gray-500">New night patrol guidelines issued for women staff.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ to, icon, label, color }: { to: string; icon: React.ReactNode; label: string; color: string }) => (
  <Link to={to} className={`${color} p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center space-y-2 h-28 hover:brightness-110 transition`}>
    <div className="p-2 bg-white/20 rounded-full">
        {icon}
    </div>
    <span className="font-bold text-white text-sm">{label}</span>
  </Link>
);

export default Home;