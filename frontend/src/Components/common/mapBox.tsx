import { useState, useEffect } from "react";
import Map, { Marker, MapLayerMouseEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export interface AddressData {
  fullAddress: string;
  area: string;
  city: string;
  state: string;
  district: string;
  postcode: string;
  longitude: number;
  latitude: number;
}

interface MapProps {
  onAddressSelect: (address: AddressData) => void;
}

const MyMap: React.FC<MapProps> = ({ onAddressSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 3.5,
  });
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ longitude: number; latitude: number } | null>(null);
  const [userAddress, setUserAddress] = useState<AddressData>({
    fullAddress: "",
    area: "",
    city: "",
    state: "",
    district: "",
    postcode: "",
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
          zoom: 14,
        }));
        setUserLocation({ latitude, longitude });
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const { lngLat } = event;
    const longitude = lngLat.lng;
    const latitude = lngLat.lat;

    setUserLocation({
      latitude,
      longitude,
    });

    getAddress(longitude, latitude);
  };

  const getAddress = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        const place = data.features[0];
        const address = place.place_name;
        const area = place.context?.find((context: any) => context.id.includes("locality"))?.text ?? "";
        const city = place.context?.find((context: any) => context.id.includes("place"))?.text ?? "";
        const state = place.context?.find((context: any) => context.id.includes("region"))?.text ?? "";
        const district = place.context?.find((context: any) => context.id.includes("district"))?.text ?? "";
        const postcode = place.context?.find((context: any) => context.id.includes("postcode"))?.text ?? "";

        setUserAddress({
          fullAddress: address,
          area,
          city,
          state,
          district,
          postcode,
          longitude: lng,
          latitude: lat,
        });
      }
    } catch (error) {
      console.error("Failed to fetch address data:", error);
    }
  };

  const handleDoneClick = () => {
    onAddressSelect(userAddress);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-col items-start gap-2 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold">Your Location:</h2>
            {userAddress.fullAddress ? (
              <>
                <p>{userAddress.area}</p>
                <p>{userAddress.city}, {userAddress.district}</p>
                <p>{userAddress.state}, {userAddress.postcode}</p>
                <button
                  onClick={handleDoneClick}
                  className="px-4 py-1 bg-black text-white rounded-md"
                >
                  Save
                </button>
              </>
            ) : (
              <p>Select a location on the map</p>
            )}
          </div>

          <Map
            mapboxAccessToken="pk.eyJ1IjoiYWtwcmFuYXZ5YWRhdiIsImEiOiJjbHdvZ2l0bHMwbDZ4MnFsYmRpejd4ZHpjIn0.SKiqLTKi43cqyMe7j0Re6A"
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onClick={handleMapClick}
            onMove={(event) => setViewport(event.viewState)}
          >
            {userLocation && (
              <Marker
                longitude={userLocation.longitude}
                latitude={userLocation.latitude}
              />
            )}
          </Map>
        </>
      )}
    </div>
  );
}

export default MyMap;
