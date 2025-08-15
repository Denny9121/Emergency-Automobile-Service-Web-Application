import React from 'react';

export default function Filters({ type, setType, radiusKm, setRadiusKm, query, onSearch }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search services, locations, or specialties..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <select value={type} onChange={(e)=>setType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="all">All</option>
            <option value="repair">Repair</option>
            <option value="towing">Towing</option>
            <option value="toll">Toll</option>
            <option value="gas">Gas</option>
            <option value="parts">Parts</option>
          </select>
          <select value={radiusKm} onChange={(e)=>setRadiusKm(parseInt(e.target.value))} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="25">Within 25 km</option>
            <option value="50">Within 50 km</option>
          </select>
        </div>
      </div>
    </div>
  );
}
