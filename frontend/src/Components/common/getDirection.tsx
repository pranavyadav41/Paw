import React, { useRef, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

interface Location {
  longitude: number;
  latitude: number;
}

interface DirectionsMapProps {
  userLocation: Location;
  providerLocation: Location;
}

const DirectionsMap: React.FC<DirectionsMapProps> = ({
  userLocation,
  providerLocation,
}) => {
  const mapRef = useRef<any>(null);
  const directionsRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current && !directionsRef.current) {
      const map = mapRef.current.getMap();
      directionsRef.current = new MapboxDirections({
        accessToken:
          "pk.eyJ1IjoiYWtwcmFuYXZ5YWRhdiIsImEiOiJjbHdvZ2l0bHMwbDZ4MnFsYmRpejd4ZHpjIn0.SKiqLTKi43cqyMe7j0Re6A",
        unit: "imperial",
        profile: "driving",
      });
      map.addControl(directionsRef.current, "top-left");
    }
  }, []);

  useEffect(() => {
    if (
      directionsRef.current &&
      userLocation.longitude !== 0 &&
      userLocation.latitude !== 0 &&
      providerLocation.longitude !== 0 &&
      providerLocation.latitude !== 0
    ) {
      const origin = [userLocation.longitude, userLocation.latitude];
      const destination = [providerLocation.longitude, providerLocation.latitude];
      directionsRef.current.setOrigin(origin);
      directionsRef.current.setDestination(destination);
    }
  }, [userLocation, providerLocation]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken="pk.eyJ1IjoiYWtwcmFuYXZ5YWRhdiIsImEiOiJjbHdvZ2l0bHMwbDZ4MnFsYmRpejd4ZHpjIn0.SKiqLTKi43cqyMe7j0Re6A"
      initialViewState={{
        longitude: (userLocation.longitude + providerLocation.longitude) / 2,
        latitude: (userLocation.latitude + providerLocation.latitude) / 2,
        zoom: 12,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {/* <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} />
      <Marker longitude={providerLocation.longitude} latitude={providerLocation.latitude} /> */}
      <NavigationControl position="bottom-right" />
    </Map>
  );
};

export default DirectionsMap;