import React from 'react';

export default function Header({ onShare, onEmergency }) {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🚗</span>
            <h1 className="text-xl md:text-2xl font-bold">Emergency Auto Service</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onShare} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all">
              Share Location
            </button>
            <button onClick={onEmergency} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-all">
              Emergency
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
