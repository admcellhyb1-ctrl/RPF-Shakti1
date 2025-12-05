import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { ComplaintCategory, ComplaintStatus } from '../types';
import { getUserSession, saveComplaint, generateId } from '../services/storageService';
import { improveDescription } from '../services/geminiService';

const RegisterComplaint: React.FC = () => {
  const navigate = useNavigate();
  const user = getUserSession();
  
  const [formData, setFormData] = useState({
    category: ComplaintCategory.OTHER,
    description: '',
    isAnonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [locationAttached, setLocationAttached] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleAnonymous = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }));
  };

  const handleAiImprove = async () => {
    if (!formData.description) return;
    setAiLoading(true);
    const improved = await improveDescription(formData.description);
    setFormData(prev => ({ ...prev, description: improved }));
    setAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const newComplaint = {
      id: generateId(),
      userId: user.id,
      userName: user.name,
      userUnit: user.unit,
      category: formData.category,
      description: formData.description,
      status: ComplaintStatus.SUBMITTED,
      timeline: [{
        status: ComplaintStatus.SUBMITTED,
        timestamp: Date.now(),
        note: 'Complaint registered successfully'
      }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      attachments: [], // Simplified for demo
      isAnonymous: formData.isAnonymous,
      location: locationAttached ? { lat: 28.61, lng: 77.23, address: 'Detected Location' } : undefined
    };

    setTimeout(() => {
        saveComplaint(newComplaint);
        setLoading(false);
        navigate('/track');
    }, 1000);
  };

  return (
    <div className="pb-20">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Register Complaint</h2>
        <p className="text-sm text-gray-500">File a secure report. Your safety is priority.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm bg-white"
          >
            {Object.values(ComplaintCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <button 
              type="button" 
              onClick={handleAiImprove}
              disabled={aiLoading || !formData.description}
              className="text-xs flex items-center gap-1 text-purple-600 font-medium hover:text-purple-800 disabled:opacity-50"
            >
              <Sparkles size={14} />
              {aiLoading ? 'Refining...' : 'AI Refine'}
            </button>
          </div>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the incident details clearly..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm"
            required
          />
        </div>

        {/* Evidence Upload */}
        <div className="grid grid-cols-2 gap-4">
            <button type="button" onClick={() => setImageCount(c => c + 1)} className="flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:bg-gray-50 hover:border-red-400 transition">
                <Camera size={20} />
                <span className="text-sm">Add Photo {imageCount > 0 && `(${imageCount})`}</span>
            </button>
            
            <button 
              type="button" 
              onClick={() => setLocationAttached(!locationAttached)}
              className={`flex items-center justify-center gap-2 border rounded-lg p-4 transition ${locationAttached ? 'bg-green-50 border-green-400 text-green-700' : 'border-dashed border-gray-300 text-gray-500 hover:bg-gray-50'}`}
            >
                <MapPin size={20} />
                <span className="text-sm">{locationAttached ? 'Location Added' : 'Add Location'}</span>
            </button>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input 
              type="checkbox" 
              id="anon" 
              checked={formData.isAnonymous}
              onChange={handleToggleAnonymous}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
            />
            <label htmlFor="anon" className="text-sm text-gray-700 select-none">
                Register as Anonymous 
                <span className="block text-xs text-gray-400">Your name will be hidden from Divisional Staff.</span>
            </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>

      </form>
    </div>
  );
};

export default RegisterComplaint;