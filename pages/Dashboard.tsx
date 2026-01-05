
import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, {user.name}!</h1>
        <p className="text-indigo-100 opacity-90 max-w-xl">
          You have successfully authenticated. This page is protected by a JWT verification layer.
          In a real app, this data would be fetched from a secure API endpoint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Account Status</h3>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-900 uppercase tracking-tight">Active & Verified</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Member Since</h3>
          <p className="text-2xl font-bold text-slate-900">
            {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Auth Type</h3>
          <p className="text-2xl font-bold text-indigo-600">JWT (Stateless)</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-amber-800 font-bold mb-2 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <span>Security Notice</span>
        </h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          The token used for this session is stored in the browser's persistent storage. In high-security production environments, 
          consider using <strong>httpOnly</strong> cookies to prevent Cross-Site Scripting (XSS) attacks.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
