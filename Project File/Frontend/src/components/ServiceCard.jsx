import React from 'react';

const typeColor = {
  repair: 'green',
  towing: 'blue',
  toll: 'yellow',
  gas: 'purple',
  parts: 'indigo'
};

export default function ServiceCard({ service }) {
  const color = typeColor[service.type] || 'gray';
  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h4 className="text-xl font-bold text-gray-800">{service.name}</h4>
            <span className="w-3 h-3 rounded-full ml-3" style={{backgroundColor: service.status === 'open' ? '#10b981' : service.status === 'busy' ? '#f59e0b' : '#ef4444'}}></span>
            <span className="text-sm text-gray-600 capitalize ml-2">{service.status}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <span className="mr-2">📍</span>
            <span>{service.address}</span>
          </div>
          <div className="flex items-center mb-3">
            <span className="mr-2">⭐</span>
            <span className="text-gray-600">{service.rating}</span>
          </div>
        </div>
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold mb-2 bg-${color}-100 text-${color}-800`}>
            {service.type}
          </div>
          <div className="text-sm text-gray-600">{service.priceRange || ''}</div>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <span className="mr-2">⏰</span>
          <span>{service.hours}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">☎️</span>
          <span>{service.phone}</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <a href={`tel:${service.phone}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all text-center">
          Call Now
        </a>
        <a
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all text-center"
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(service.address)}`}
          target="_blank"
          rel="noreferrer"
        >
          Directions
        </a>
      </div>
    </div>
  );
}
