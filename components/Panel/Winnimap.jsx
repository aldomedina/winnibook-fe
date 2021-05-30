import SectionWrapper from './SectionWrapper';
import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import mapstyle from '../../assets/mapstyle';
import themeConfig from '../Theme/colors';

import PlaceCard from '../PlaceCard';

const Winnimap = ({ reference, locals }) => {

  const googlemap = useRef(null);
  const [activePlace, setActivePlace] = useState();

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_KEY,
      version: 'weekly'
    });
    let map;

    loader.load().then(() => {
      console.log('google maps loaded');
      const google = window.google;

      map = new google.maps.Map(googlemap.current, {
        center: { lat: 49.88497626, lng: -97.1345375 },
        zoom: 13,
        styles: mapstyle,
        scrollwheel: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: false,
        scaleControl: true
      });

      locals.map((item, i) => {
        const icon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: themeConfig.colors[item.main_category?.theme].primary,
          fillOpacity: 0.6,
          strokeWeight: 0,
          rotation: 0,
          scale: 4
        };
        const marker = new google.maps.Marker({
          position: { 
            lat: parseFloat(item.address?.latitude), 
            lng: parseFloat(item.address?.longitude)
          },
          icon
        });
        marker.setMap(map);
        marker.addListener('click', () => setActivePlace(item));
      });

    });
  }, []);

  return (
    <SectionWrapper
      i={4}
      reference={reference}
      customClasses="
        w-60vw 
        flex 
        gap-5 
        pt-14 
        md:pt-40
      "
    >
      <div 
        id="map" 
        className={`
          bg-yellow-200 
          h-full
          rounded-3xl
          transition-all
          ${activePlace?.name ? "w-10/12" : "w-full"}
        `}
        ref={googlemap}
      />

      {activePlace?.name && (
        <div 
          className="
            w-2/12 
            max-h-44
          "
        >
          <PlaceCard
            name={activePlace.name}
            categories={[activePlace.main_category]}
            theme={activePlace.main_category.theme}
          />
        </div>
      )}
    </SectionWrapper>
  );
};

export default Winnimap;
