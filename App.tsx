
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Guide from './pages/Guide';
import { AuthState, AuthView, User } from './types';
import { mockBackend } from './services/mockBackend';
import { Icons } from './constants';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });
  
  const [currentView, setCurrentView] = useState<AuthView>(AuthView.GUIDE);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    rememberMe: false 
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Initialize session
  useEffect(() => {
    const checkSession = async () => {
      const session = await mockBackend.checkSession();
      if (session) {
        setAuth({
          user: session.user,
          token: session.token,
          isAuthenticated: true,
          isLoading: false
        });
        setCurrentView(AuthView.DASHBOARD);
      } else {
        setAuth(prev => ({ ...prev, isLoading: false }));
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = useCallback(() => {
    mockBackend.logout();
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
    setCurrentView(AuthView.GUIDE);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    // Validation for matching passwords
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      setFormLoading(false);
      return;
    }

    const res = await mockBackend.signup(formData.name, formData.email, formData.password);
    setFormLoading(false);
    
    if (res.success) {
      setCurrentView(AuthView.LOGIN);
      setFormData({ ...formData, password: '', confirmPassword: '' });
      alert("Registration successful! You can now log in.");
    } else {
      setFormError(res.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    const res = await mockBackend.login(formData.email, formData.password);
    setFormLoading(false);

    if (res.success && res.user && res.token) {
      setAuth({
        user: res.user,
        token: res.token,
        isAuthenticated: true,
        isLoading: false
      });
      setCurrentView(AuthView.DASHBOARD);
      // We clear most fields but preserve rememberMe if needed for future logic
      setFormData({ name: '', email: '', password: '', confirmPassword: '', rememberMe: formData.rememberMe });
    } else {
      setFormError(res.message);
    }
  };

  const renderAuthForm = (isLogin: boolean) => (
    <div className="max-w-md mx-auto pt-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="mb-8 text-center">
          <div className="inline-flex bg-indigo-50 p-4 rounded-full text-indigo-600 mb-4">
             {isLogin ? <Icons.Lock /> : <Icons.User />}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? 'Sign in to access your protected dashboard.' : 'Join AuthMaster to start your development journey.'}
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-5">
          {formError && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-lg border border-red-100">
              {formError}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="name@company.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Confirm Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          <div className="flex items-center space-x-2 py-1">
            <input 
              type="checkbox" 
              id="rememberMe"
              className="w-4 h-4 text-indigo-600 bg-slate-50 border-slate-200 rounded focus:ring-indigo-500"
              checked={formData.rememberMe}
              onChange={e => setFormData({...formData, rememberMe: e.target.checked})}
            />
            <label htmlFor="rememberMe" className="text-sm text-slate-600 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          <button 
            type="submit" 
            disabled={formLoading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform active:scale-95 disabled:opacity-70 flex justify-center items-center"
          >
            {formLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (isLogin ? 'Sign In' : 'Create Free Account')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => {
                setFormError('');
                setFormData({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false });
                setCurrentView(isLogin ? AuthView.SIGNUP : AuthView.LOGIN);
              }}
              className="ml-2 font-bold text-indigo-600 hover:text-indigo-700"
            >
              {isLogin ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar 
        auth={auth} 
        currentView={currentView} 
        setView={setCurrentView} 
        onLogout={handleLogout} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {auth.isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {currentView === AuthView.GUIDE && <Guide />}
            {currentView === AuthView.DASHBOARD && auth.isAuthenticated && <Dashboard user={auth.user} />}
            {currentView === AuthView.LOGIN && !auth.isAuthenticated && renderAuthForm(true)}
            {currentView === AuthView.SIGNUP && !auth.isAuthenticated && renderAuthForm(false)}
            
            {/* Redirect if user tries to access dashboard while logged out */}
            {currentView === AuthView.DASHBOARD && !auth.isAuthenticated && (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-900">Protected Area</h2>
                <p className="text-slate-500 mt-2">Please log in to view your dashboard.</p>
                <button 
                  onClick={() => setCurrentView(AuthView.LOGIN)}
                  className="mt-6 text-indigo-600 font-bold underline"
                >
                  Go to Login
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
