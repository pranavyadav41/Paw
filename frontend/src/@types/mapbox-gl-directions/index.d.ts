declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { LngLatLike } from 'mapbox-gl';
  
    interface MapboxDirectionsOptions {
      accessToken: string;
      unit?: 'metric' | 'imperial';
      profile?: 'driving' | 'walking' | 'cycling';
    }
  
    class MapboxDirections {
      constructor(options: MapboxDirectionsOptions);
      setOrigin(origin: LngLatLike): void;
      setDestination(destination: LngLatLike): void;
    }
  
    export default MapboxDirections;
  }
  