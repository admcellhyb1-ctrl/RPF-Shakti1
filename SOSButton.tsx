import React, { useState } from 'react';
import { Phone, AlertTriangle, X } from 'lucide-react';

const SOSButton: React.FC = () => {
  const [active, setActive] = useState(false);

  const handleSOS = () => {
    setActive(true);
    // In a real app, this would trigger location sharing + backend alert
    // For web demo, we show a modal
  };

  return (
    <>
      <button
        onClick={handleSOS}
        className="fixed bottom-20 right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg animate-pulse border-4 border-red-200"
        aria-label="SOS Emergency"
      >
        <span className="font-bold text-xs absolute -top-1 -right-1 bg-white text-red-600 px-1 rounded-full border border-red-600">SOS</span>
        <AlertTriangle size={28} />
      </button>

      {active && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl animate-bounce-short">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
               <AlertTriangle size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">Emergency Alert</h2>
            <p className="text-gray-600 mb-6">
              Sending your live location to RPF Control Room and your Unit Head.
            </p>
            
            <div className="space-y-3">
              <a href="tel:139" className="block w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
                <Phone size={20} /> Call Helpline (139)
              </a>
              <button 
                onClick={() => setActive(false)}
                className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Cancel Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;