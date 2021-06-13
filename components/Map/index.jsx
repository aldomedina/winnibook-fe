import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import mapstyle from '../../assets/mapstyle';
import themeConfig from '../Theme/colors';

const Map = ({ location, theme }) => {
  const googlemap = useRef(null);

  useEffect(() => {
    mountMap();
  }, []);

  useEffect(() => {
    mountMap();
  }, [location.latitude, location.longitude]);

  const mountMap = () => {
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
        zoom: 15,
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
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 6
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
  }

  return (
    <div id="map" className="w-full h-full rounded-3xl" ref={googlemap} />
  );
};

export default Map;
