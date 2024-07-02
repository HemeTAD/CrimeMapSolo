import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService';

const MapDisplay = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const mapContainerRef = useRef(null); // This is a reference to the map container
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

  const center = {
    lat: user?.address?.lat || 0,
    lng: user?.address?.lng || 0,
  };

  if (loadError) return <div>Error loading map...</div>;

  return isLoaded ? (
    <div ref={mapContainerRef} style={{width:'100%', height:'500px'}}>

    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center}
      zoom={15}
      >
      <Marker position={center} />
    </GoogleMap>
    </div>
  ) : (
    <div>Loading map...</div>
  );
};

export default MapDisplay;

