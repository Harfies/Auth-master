
import React from 'react';
import { AuthState, AuthView } from '../types';
import { Icons } from '../constants';

interface NavbarProps {
  auth: AuthState;
  currentView: AuthView;
  setView: (view: AuthView) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ auth, currentView, setView, onLogout }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Icons.Shield />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">AuthMaster</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setView(AuthView.GUIDE)}
              className={`text-sm font-medium transition-colors ${currentView === AuthView.GUIDE ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Developer Guide
            </button>
            {auth.isAuthenticated ? (
              <>
                <button 
                  onClick={() => setView(AuthView.DASHBOARD)}
                  className={`text-sm font-medium transition-colors ${currentView === AuthView.DASHBOARD ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
                >
                  Dashboard
                </button>
                <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{auth.user?.name}</p>
                    <p className="text-xs text-slate-500">{auth.user?.email}</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setView(AuthView.LOGIN)}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600"
                >
                  Log In
                </button>
                <button 
                  onClick={() => setView(AuthView.SIGNUP)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
