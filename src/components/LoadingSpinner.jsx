import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
    </div>
  );
}
