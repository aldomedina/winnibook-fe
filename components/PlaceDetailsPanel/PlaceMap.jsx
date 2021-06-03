import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import mapstyle from '../../assets/mapstyle';
import themeConfig from '../Theme/colors';

const PlaceMap = ({ location, theme }) => {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_KEY,
      version: 'weekly'
    });
    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: { 
          lat: parseFloat(location?.latitude), 
          lng: parseFloat(location?.longitude)
        },
        zoom: 13,
        styles: mapstyle,
        scrollwheel: false,
        streetViewControl: false,
        zoomControl: true,
        fullscreenControl: false,
        scaleControl: true
      });

      const icon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: themeConfig.colors[theme].primary,
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 7
      };
      const marker = new google.maps.Marker({
        position: { 
          lat: parseFloat(location?.latitude), 
          lng: parseFloat(location?.longitude)
        },
        icon
      });
      marker.setMap(map);
    });
  }, []);

  return (
    <div 
      className="
        min-w-90vw 
        md:min-w-40vw 

        py-32
        pl-32
        
        flex 
        justify-center
      "
    >
      <div id="map" className="w-full max-h-full rounded-3xl" ref={googlemap} />
    </div>
  );
};

export default PlaceMap;
