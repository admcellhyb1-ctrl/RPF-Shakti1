import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Smartphone, ArrowRight } from 'lucide-react';
import { loginUser } from '../services/authService';
import { THEME_GRADIENT } from '../constants';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate mock login
      const isOtp = activeTab === 'user';
      // For demo purposes, we accept any OTP if user is found, or password if admin
      await loginUser(identifier, isOtp);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. For demo try Mobile: 9876543210 (User) or "admin_div" (Admin).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-6 ${THEME_GRADIENT}`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-red-700 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-4 shadow-lg backdrop-blur-sm">
                 <img 
                   src="https://upload.wikimedia.org/wikipedia/en/c/c2/Railway_Protection_Force_Logo.png" 
                   alt="RPF Logo" 
                   className="h-16 w-16 object-contain"
                 />
              </div>
              <h1 className="text-2xl font-bold">RPF Shakti</h1>
              <p className="text-red-100 text-sm mt-1">Empowering Women Personnel</p>
            </div>
        </div>

        <div className="p-6">
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'user' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Personnel Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'admin' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Official/Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'user' ? 'Mobile Number' : 'Username'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {activeTab === 'user' ? <Smartphone size={18} className="text-gray-400" /> : <UserIconInput />}
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm transition"
                  placeholder={activeTab === 'user' ? 'Enter 10-digit mobile' : 'Enter official ID'}
                  required
                />
              </div>
            </div>

            {activeTab === 'user' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                   </div>
                  <input
                    type="password"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm transition"
                    placeholder="Enter OTP (Any for demo)"
                  />
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
               <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Lock size={18} className="text-gray-400" />
                  </div>
                 <input
                   type="password"
                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm transition"
                   placeholder="Enter password"
                 />
               </div>
             </div>
            )}

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 mt-6 shadow-md"
            >
              {loading ? 'Verifying...' : 'Login securely'}
              {!loading && <ArrowRight size={18} className="ml-2" />}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Protected by RPF Cyber Cell. <br/> Unauthorized access is a punishable offense.
          </p>
        </div>
      </div>
    </div>
  );
};

const UserIconInput = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default Login;