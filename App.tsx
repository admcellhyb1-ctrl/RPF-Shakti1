import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterComplaint from './pages/RegisterComplaint';
import TrackComplaints from './pages/TrackComplaints';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Resources from './pages/Resources';
import Layout from './components/Layout';
import { getUserSession } from './services/storageService';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getUserSession();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><RegisterComplaint /></ProtectedRoute>} />
          <Route path="/track" element={<ProtectedRoute><TrackComplaints /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;