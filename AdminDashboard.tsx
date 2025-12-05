import React, { useEffect, useState } from 'react';
import { getComplaints, updateComplaintStatus, getUserSession } from '../services/storageService';
import { Complaint, ComplaintStatus, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Filter, CheckSquare } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const user = getUserSession();
  const [filter, setFilter] = useState<'ALL' | ComplaintStatus>('ALL');

  useEffect(() => {
    // In a real app, API would filter based on admin division/zone
    setComplaints(getComplaints());
  }, []);

  const handleStatusUpdate = (id: string, newStatus: ComplaintStatus) => {
    updateComplaintStatus(id, newStatus, `Status updated by ${user?.name}`, user?.name || 'Admin');
    setComplaints(getComplaints()); // Refresh
  };

  // Simple stats for chart
  const stats = [
    { name: 'Submitted', value: complaints.filter(c => c.status === ComplaintStatus.SUBMITTED).length, color: '#FBBF24' },
    { name: 'Review', value: complaints.filter(c => c.status === ComplaintStatus.UNDER_REVIEW).length, color: '#60A5FA' },
    { name: 'Action', value: complaints.filter(c => c.status === ComplaintStatus.ACTION_TAKEN).length, color: '#A78BFA' },
    { name: 'Closed', value: complaints.filter(c => c.status === ComplaintStatus.CLOSED).length, color: '#34D399' },
  ];

  const filteredComplaints = filter === 'ALL' 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  if (!user || user.role === UserRole.USER) return <div>Access Denied</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Command Center</h2>
            <p className="text-sm text-gray-500">{user.role.replace('_', ' ')} - {user.division}</p>
        </div>
        <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
            LIVE MONITOR
        </div>
      </div>

      {/* Stats Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-48">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Complaint Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Action List */}
      <div>
        <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-gray-800">Pending Actions</h3>
             <button className="text-gray-500"><Filter size={18} /></button>
        </div>

        <div className="space-y-3">
            {filteredComplaints.map(c => (
                <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
                    <div className="flex justify-between mb-2">
                        <span className="font-mono text-xs text-gray-500">#{c.id}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-800">{c.category}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.description}</p>
                        {c.isAnonymous && <span className="text-[10px] text-red-500 font-bold mt-1 block">ANONYMOUS REPORT</span>}
                    </div>
                    
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                        {c.status === ComplaintStatus.SUBMITTED && (
                            <button 
                                onClick={() => handleStatusUpdate(c.id, ComplaintStatus.UNDER_REVIEW)}
                                className="flex-1 bg-blue-50 text-blue-700 text-xs font-medium py-2 rounded hover:bg-blue-100"
                            >
                                Acknowledge
                            </button>
                        )}
                        {c.status === ComplaintStatus.UNDER_REVIEW && (
                            <button 
                                onClick={() => handleStatusUpdate(c.id, ComplaintStatus.ACTION_TAKEN)}
                                className="flex-1 bg-purple-50 text-purple-700 text-xs font-medium py-2 rounded hover:bg-purple-100"
                            >
                                Take Action
                            </button>
                        )}
                         {c.status !== ComplaintStatus.CLOSED && (
                            <button 
                                onClick={() => handleStatusUpdate(c.id, ComplaintStatus.CLOSED)}
                                className="flex-1 bg-green-50 text-green-700 text-xs font-medium py-2 rounded hover:bg-green-100"
                            >
                                Close Case
                            </button>
                        )}
                        <button className="px-3 py-2 bg-gray-50 rounded text-gray-600 hover:bg-gray-100">
                             Details
                        </button>
                    </div>
                </div>
            ))}
            {filteredComplaints.length === 0 && <p className="text-center text-gray-400 text-sm py-8">No complaints found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;