import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Zerbait gaizki joan da</h2>
          <p className="text-slate-600 mb-6">Orria kargatzean errore bat gertatu da.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
          >
            Berriz saiatu
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
