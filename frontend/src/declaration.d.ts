// src/declarations.d.ts

declare module 'react-map-gl-geocoder' {
    import { ControlPosition } from 'react-map-gl';
  
    interface GeocoderProps {
      mapRef: any;
      containerRef?: any;
      onViewportChange?: (viewport: any) => void;
      onResult?: (event: any) => void;
      onError?: (event: any) => void;
      position?: ControlPosition;
      zoom?: number;
      placeholder?: string;
      proximity?: {
        longitude: number;
        latitude: number;
      };
      bbox?: [number, number, number, number];
      countries?: string;
      types?: string;
      limit?: number;
      minLength?: number;
      flyTo?: boolean;
      filter?: (item: any) => boolean;
      localGeocoder?: (query: string) => any[];
      reverseGeocode?: boolean;
    }
  
    const Geocoder: React.FC<any>;
    export default Geocoder;
  }
  