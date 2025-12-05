import React, { useEffect, useState } from 'react';
import { getComplaints, getUserSession } from '../services/storageService';
import { Complaint, ComplaintStatus } from '../types';
import { CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const TrackComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const user = getUserSession();

  useEffect(() => {
    if (user) {
      const all = getComplaints();
      const myComplaints = all.filter(c => c.userId === user.id);
      setComplaints(myComplaints);
    }
  }, [user]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">My Complaints</h2>

      {complaints.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-sm">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
             <AlertCircle className="text-gray-400" />
          </div>
          <p className="text-gray-500">No complaints registered yet.</p>
        </div>
      ) : (
        complaints.map(complaint => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))
      )}
    </div>
  );
};

const ComplaintCard: React.FC<{ complaint: Complaint }> = ({ complaint }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: ComplaintStatus) => {
    switch(status) {
        case ComplaintStatus.SUBMITTED: return 'bg-yellow-100 text-yellow-800';
        case ComplaintStatus.UNDER_REVIEW: return 'bg-blue-100 text-blue-800';
        case ComplaintStatus.ACTION_TAKEN: return 'bg-purple-100 text-purple-800';
        case ComplaintStatus.CLOSED: return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200">
      <div 
        className="p-4 flex justify-between items-start cursor-pointer hover:bg-gray-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-gray-400">#{complaint.id}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-800">{complaint.category}</h3>
          <p className="text-xs text-gray-500 mt-1">{new Date(complaint.createdAt).toLocaleDateString()}</p>
        </div>
        <ChevronRight size={20} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-50">
           <div className="mt-3">
               <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg mb-4">
                   {complaint.description}
               </p>
               
               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Progress Timeline</h4>
               <div className="space-y-4 pl-2">
                  {complaint.timeline.map((event, idx) => (
                      <div key={idx} className="relative pl-6 pb-2 border-l-2 border-gray-200 last:border-0">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-red-500 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                          </div>
                          <div>
                              <p className="text-sm font-medium text-gray-800">{event.status}</p>
                              <p className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                              {event.note && <p className="text-xs text-gray-600 mt-1 italic">"{event.note}"</p>}
                          </div>
                      </div>
                  ))}
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TrackComplaints;