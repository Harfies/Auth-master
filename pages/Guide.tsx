
import React, { useState } from 'react';
import { BACKEND_SNIPPETS } from '../constants';
import CodeBlock from '../components/CodeBlock';
import { geminiService } from '../services/geminiService';

const Guide: React.FC = () => {
  const [explanation, setExplanation] = useState<string>("");
  const [loadingExpl, setLoadingExpl] = useState(false);

  const fetchExplanation = async (topic: string) => {
    setLoadingExpl(true);
    const text = await geminiService.getExplanation(topic);
    setExplanation(text);
    setLoadingExpl(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Mastering Full-Stack Authentication
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Building a secure authentication system requires careful coordination between the React frontend, 
          Node.js backend, and your database. This guide breaks down the core components.
        </p>
      </header>

      {/* Interactive AI section */}
      <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        </div>
        <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center space-x-2">
          <span>AI Knowledge Hub</span>
          <span className="bg-indigo-600 text-[10px] text-white px-2 py-0.5 rounded-full uppercase">Powered by Gemini</span>
        </h2>
        <p className="text-indigo-800/80 mb-6 text-sm">Select a topic below to get an AI-generated explanation of how it fits into the full-stack architecture.</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {['JWT (JSON Web Tokens)', 'Password Hashing', 'Middleware Protection', 'Stateless Sessions', 'CORS & Auth'].map(topic => (
            <button 
              key={topic}
              onClick={() => fetchExplanation(topic)}
              disabled={loadingExpl}
              className="bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
            >
              Explain {topic}
            </button>
          ))}
        </div>

        {explanation && (
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-indigo-200 prose prose-indigo max-w-none">
             <div className="flex justify-between items-center mb-4">
               <span className="text-xs font-bold text-indigo-400 uppercase">Analysis Response</span>
               <button onClick={() => setExplanation("")} className="text-indigo-400 hover:text-indigo-600">Close</button>
             </div>
             <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
               {explanation}
             </div>
          </div>
        )}
        {loadingExpl && <div className="text-indigo-600 animate-pulse text-sm font-medium">Gemini is thinking...</div>}
      </section>

      {/* Code sections */}
      <div className="space-y-16">
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-slate-200 text-slate-700 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm">1</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Backend: Secure Registration</h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            Never store passwords in plain text. Use <strong>bcrypt</strong> to salt and hash passwords before saving them to MongoDB.
          </p>
          <CodeBlock title="controllers/auth.controller.js" code={BACKEND_SNIPPETS.SIGNUP} />
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-slate-200 text-slate-700 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm">2</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Backend: Login & Token Issuance</h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            Upon successful credential validation, the server generates a <strong>signed JWT</strong> that includes the user's ID and role.
          </p>
          <CodeBlock title="controllers/auth.controller.js" code={BACKEND_SNIPPETS.LOGIN} />
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-slate-200 text-slate-700 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm">3</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Middleware: Protected Routes</h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            Routes are protected by intercepting requests and verifying the <code>Authorization</code> header using a JWT library.
          </p>
          <CodeBlock title="middleware/auth.js" code={BACKEND_SNIPPETS.MIDDLEWARE} />
        </section>
      </div>

      <footer className="pt-12 border-t border-slate-200">
        <div className="bg-slate-900 rounded-3xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to build?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Authentication is the foundation of almost every SaaS product. 
            Once you master the request-response cycle and token security, you're ready for production.
          </p>
          <div className="flex justify-center space-x-4">
             <a href="https://github.com/expressjs/express" target="_blank" className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg text-sm transition-colors">Express Docs</a>
             <a href="https://jwt.io/introduction" target="_blank" className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg text-sm transition-colors">JWT.io Guide</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Guide;
