import { useState, useEffect } from "react";
import Map, { Marker, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AnyIfEmpty } from "react-redux";

interface AddressData {
  fullAddress: string;
  area:string,
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

function MyMap({ onAddressSelect }: MapProps) {
  const [viewport, setViewport] = useState<any>({
    latitude: 0,
    longitude: 0,
    zoom: 3.5,
  });
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<AddressData>({
    fullAddress: "",
    area:"",
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
        setViewport((prevViewport: any) => ({
          ...prevViewport,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    setUserLocation({
      latitude: lngLat.lat,
      longitude: lngLat.lng,
      zoom: viewport.zoom,
    });
    getAddress(lngLat.lng, lngLat.lat);
  };

  const getAddress = async (lng: number, lat: number) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiYWtwcmFuYXZ5YWRhdiIsImEiOiJjbHdvZ2l0bHMwbDZ4MnFsYmRpejd4ZHpjIn0.SKiqLTKi43cqyMe7j0Re6A`
    );
    const data = await response.json();
    if (data.features.length > 0) {
      const place = data.features[0];
      console.log(place,"place")
      const address = place.place_name;
      const area=
      place.context.find((context: any) => context.id.includes("locality"))
          ?.text || "";
      const city =
        place.context.find((context: any) => context.id.includes("place"))
          ?.text || "";
      const state =
        place.context.find((context: any) => context.id.includes("region"))
          ?.text || "";
      const district =
        place.context.find((context: any) => context.id.includes("district"))
          ?.text || "";
      const postcode =
        place.context.find((context: any) => context.id.includes("postcode"))
          ?.text || "";

          setUserAddress({ 
            fullAddress: address,
            area, 
            city, 
            state, 
            district, 
            postcode,
            longitude: lng,
            latitude: lat
          });
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
        <div className="flex gap-3 items-center">
        <h1>
            <span className="font-semibold">Your Location:</span> {userAddress.fullAddress || "Current Location"}
          </h1>
           {userAddress.fullAddress && ( 
          <button
              onClick={handleDoneClick}
              style={{
                padding: "2px 16px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom:"5px"
              }}
            >
              Save
            </button>
           )}

        </div>
          
          <Map
            mapboxAccessToken="pk.eyJ1IjoiYWtwcmFuYXZ5YWRhdiIsImEiOiJjbHdvZ2l0bHMwbDZ4MnFsYmRpejd4ZHpjIn0.SKiqLTKi43cqyMe7j0Re6A"
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onClick={handleMapClick}
          >
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
            />
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
