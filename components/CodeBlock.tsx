
import React from 'react';

interface CodeBlockProps {
  code: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden my-4 shadow-lg">
      {title && (
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
          <span className="text-xs font-mono text-slate-400">{title}</span>
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
          </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-indigo-300">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
