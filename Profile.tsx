import React from 'react';
import { getUserSession } from '../services/storageService';
import { User, UserRole } from '../types';
import { User as UserIcon, MapPin, Phone, Award } from 'lucide-react';

const Profile: React.FC = () => {
  const user = getUserSession();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center pt-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
            <UserIcon size={48} className="text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.role === UserRole.USER ? 'Constable / RPF' : user.role}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50">
            <h3 className="text-sm font-bold text-gray-400 uppercase">Official Details</h3>
        </div>
        <div className="divide-y divide-gray-50">
            <ProfileItem icon={<Award size={18} />} label="Unit/Post" value={user.unit} />
            <ProfileItem icon={<MapPin size={18} />} label="Division" value={user.division} />
            <ProfileItem icon={<MapPin size={18} />} label="Zone" value={user.zone} />
            <ProfileItem icon={<Phone size={18} />} label="Registered Mobile" value={user.mobile} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-4 border-b border-gray-50">
            <h3 className="text-sm font-bold text-gray-400 uppercase">Settings</h3>
        </div>
        <div className="p-4 space-y-3">
             <button className="w-full text-left text-sm text-gray-700 py-2">Notification Preferences</button>
             <button className="w-full text-left text-sm text-gray-700 py-2">Change Language</button>
             <button className="w-full text-left text-sm text-red-600 py-2 font-medium">Deactivate Account</button>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center p-4 gap-3">
        <div className="text-gray-400">{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

export default Profile;