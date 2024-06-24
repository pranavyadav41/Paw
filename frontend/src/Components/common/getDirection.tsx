import React, { useState, useEffect, useRef } from 'react';

// Declare global mapboxgl and MapboxDirections
declare global {
  interface Window {
    mapboxgl: any;
    MapboxDirections: any;
  }
}

interface DirectionsMapProps {
  providerLocation: [number, number]; // [longitude, latitude]
  userLocation: [number, number]; // [longitude, latitude]
}

const DirectionsMap: React.FC<DirectionsMapProps> = ({ providerLocation, userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    console.log("Initializing map...");
    console.log("Mapbox GL JS available:", !!window.mapboxgl);
    console.log("Mapbox Directions available:", !!window.MapboxDirections);
    console.log("Map container size:", 
      mapContainer.current?.clientWidth, 
      mapContainer.current?.clientHeight
    );

    try {
      if (!window.mapboxgl) {
        throw new Error("Mapbox GL JS is not loaded");
      }

      window.mapboxgl.accessToken = 'pk.eyJ1IjoiYWtwcmFuYXZ5YWRhdiIsImEiOiJjbHdvZ2l0bHMwbDZ4MnFsYmRpejd4ZHpjIn0.SKiqLTKi43cqyMe7j0Re6A';

      map.current = new window.mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: providerLocation,
        zoom: 12
      });

      console.log("Map object created:", map.current);

      console.log("Adding load event listener");
      map.current.on('load', () => {
        console.log("Map loaded event fired");
        setLoading(false);
        console.log("Loading state set to false");

        if (!window.MapboxDirections) {
          throw new Error("Mapbox Directions is not loaded");
        }

        const directions = new window.MapboxDirections({
          accessToken: window.mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving',
          alternatives: true,
          geometries: 'geojson',
          controls: { instructions: true, profileSwitcher: true },
          flyTo: false
        });

        map.current.addControl(directions, 'top-left');

        console.log("Setting origin:", providerLocation);
        console.log("Setting destination:", userLocation);

        directions.setOrigin(providerLocation);
        directions.setDestination(userLocation);
      });
    } catch (error) {
      console.error("Error during map initialization:", error);
      setLoading(false);  // Set loading to false even if there's an error
    }

    // Clean up on unmount
    return () => {
      console.log("Cleaning up map");
      map.current?.remove();
    }
  }, [providerLocation, userLocation]);

  return (
    <div className="relative h-screen w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default DirectionsMap;