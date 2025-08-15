import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '420px' };

export default function MapComponent({ services, userLocation }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });
  const [selected, setSelected] = useState(null);

  const center = useMemo(() => userLocation || { lat: 40.7128, lng: -74.0060 }, [userLocation]);

  if (!isLoaded) return <div className="p-4">Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {userLocation && (
        <Marker position={userLocation} />
      )}
      {services.map(svc => (
        <Marker
          key={svc._id}
          position={svc.coordinates}
          onClick={() => setSelected(svc)}
        />
      ))}
      {selected && (
        <InfoWindow position={selected.coordinates} onCloseClick={() => setSelected(null)}>
          <div className="p-2">
            <h3 className="font-bold">{selected.name}</h3>
            <p className="text-sm">{selected.address}</p>
            <a className="text-blue-600 underline text-sm" href={`tel:${selected.phone}`}>{selected.phone}</a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
