import React, { useState } from 'react';
import { Book, Phone, Shield, Bot, Send } from 'lucide-react';
import { askSafetyBot } from '../services/geminiService';

const Resources: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setLoading(true);
    setChatResponse(null);
    const response = await askSafetyBot(chatInput);
    setChatResponse(response);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-bold text-gray-800">Resources & Help</h2>

      {/* Emergency Contacts */}
      <div className="bg-red-50 p-4 rounded-xl border border-red-100">
        <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
            <Phone size={18} /> Important Helplines
        </h3>
        <div className="grid grid-cols-2 gap-3">
            <ContactCard number="139" label="Rail Madad" />
            <ContactCard number="1091" label="Women Helpline" />
            <ContactCard number="112" label="Emergency" />
            <ContactCard number="182" label="RPF Security" />
        </div>
      </div>

      {/* AI Bot */}
      <div className="bg-white rounded-xl shadow-md border border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
            <div className="flex items-center gap-2">
                <Bot size={24} />
                <div>
                    <h3 className="font-bold">RPF Safety Assistant</h3>
                    <p className="text-xs text-purple-200">Powered by AI</p>
                </div>
            </div>
        </div>
        <div className="p-4 bg-gray-50 min-h-[150px]">
             {!chatResponse && !loading && (
                 <p className="text-sm text-gray-500 text-center mt-4">Ask me about safety guidelines, leave rules, or RPF protocols.</p>
             )}
             {loading && (
                 <div className="flex justify-center py-4">
                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                 </div>
             )}
             {chatResponse && (
                 <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-gray-700 leading-relaxed border border-gray-200">
                     {chatResponse}
                 </div>
             )}
        </div>
        <div className="p-2 border-t border-gray-100 bg-white">
            <form onSubmit={handleAskAI} className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
                <button type="submit" disabled={loading} className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50">
                    <Send size={18} />
                </button>
            </form>
        </div>
      </div>

      {/* Static Links */}
      <div className="space-y-2">
         <h3 className="font-bold text-gray-800 text-sm mb-2">Guidelines</h3>
         <ResourceLink title="Sexual Harassment at Workplace (Prevention) Act" />
         <ResourceLink title="RPF Women Welfare Guidelines 2024" />
         <ResourceLink title="Standard Operating Procedure for Night Duty" />
      </div>
    </div>
  );
};

const ContactCard = ({ number, label }: { number: string, label: string }) => (
    <a href={`tel:${number}`} className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center text-center hover:bg-red-50 transition border border-red-100">
        <span className="text-lg font-bold text-red-600">{number}</span>
        <span className="text-xs text-gray-600">{label}</span>
    </a>
);

const ResourceLink = ({ title }: { title: string }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50">
        <div className="flex items-center gap-3">
            <Book size={18} className="text-gray-400" />
            <span className="text-sm text-gray-700 font-medium">{title}</span>
        </div>
        <Shield size={14} className="text-gray-300" />
    </div>
);

export default Resources;