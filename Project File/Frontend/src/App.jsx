import React, { useEffect, useMemo, useState } from 'react';
import api from './api';
import Header from './components/Header';
import Filters from './components/Filters';
import ServiceCard from './components/ServiceCard';
import MapComponent from './components/MapComponent';

export default function App() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [type, setType] = useState('all');
  const [query, setQuery] = useState('');
  const [radiusKm, setRadiusKm] = useState(10);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchServices = async (opts = {}) => {
    const params = new URLSearchParams();
    if (opts.lat && opts.lng) {
      params.set('lat', opts.lat);
      params.set('lng', opts.lng);
      params.set('radius', radiusKm);
    }
    if (type && type !== 'all') params.set('type', type);

    const res = await api.get(`/api/services?${params.toString()}`);
    setServices(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    // initial fetch without location
    fetchServices({});
  }, []);

  useEffect(() => {
    // re-filter when type/radius changes
    if (userLocation) {
      fetchServices(userLocation);
    } else {
      fetchServices({});
    }
  }, [type, radiusKm]);

  const onFindLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation not supported');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const uloc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setUserLocation(uloc);
      await fetchServices(uloc);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
  };

  const onSearch = async (text) => {
    setQuery(text);
    if (!text) {
      setFiltered(services);
      return;
    }
    const res = await api.get('/api/services/search', { params: { q: text } });
    setFiltered(res.data);
  };

  return (
    <div className="min-h-screen">
      <Header onShare={() => { if (userLocation) navigator.clipboard.writeText(`${userLocation.lat},${userLocation.lng}`) }} onEmergency={() => alert('Dial your local emergency number.')} />
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Need Immediate Auto Help?</h2>
            <p className="text-gray-600 mb-4">Find the nearest repair shops, toll gates, and emergency services based on your current location</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={onFindLocation} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Find Services Near Me
              </button>
            </div>
          </div>
        </div>

        <Filters type={type} setType={setType} radiusKm={radiusKm} setRadiusKm={setRadiusKm} query={query} onSearch={onSearch} />

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-2">
              <MapComponent services={filtered} userLocation={userLocation || { lat: 40.7128, lng: -74.0060 }} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-semibold">Repair Shops</h4><p className="text-2xl font-bold text-green-600">{filtered.filter(s => s.type==='repair').length}</p></div>
            <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-semibold">Towing</h4><p className="text-2xl font-bold text-blue-600">{filtered.filter(s => s.type==='towing').length}</p></div>
            <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-semibold">Toll Gates</h4><p className="text-2xl font-bold text-yellow-600">{filtered.filter(s => s.type==='toll').length}</p></div>
            <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-semibold">Gas</h4><p className="text-2xl font-bold text-purple-600">{filtered.filter(s => s.type==='gas').length}</p></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Nearby Services</h3>
            <span className="text-gray-600">Showing {filtered.length} services</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(svc => <ServiceCard key={svc._id} service={svc} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
