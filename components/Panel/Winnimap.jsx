import SectionWrapper from './SectionWrapper';
import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { items as places } from '../../mock/search';
import mapstyle from '../../assets/mapstyle';
import themeConfig from '../Theme/colors';
import PlaceCard from '../PlaceCard';
const Winnimap = ({ reference }) => {
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
        zoomControl: true,
        fullscreenControl: false,
        scaleControl: true
      });
      places.map((item, i) => {
        const icon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: themeConfig.colors[item.theme].bg,
          fillOpacity: 0.6,
          strokeWeight: 0,
          rotation: 0,
          scale: 4
        };
        const marker = new google.maps.Marker({
          position: item.location,
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
      customClasses="w-screen md:w-80vw flex  gap-5 pt-14 md:pt-40"
    >
      <div id="map" className="bg-yellow-200 w-9/12 h-full" ref={googlemap} />
      <div className="w-3/12 max-h-44">
        {activePlace?.name && (
          <PlaceCard
            name={activePlace.name}
            categories={activePlace.categories}
            theme={activePlace.theme}
          />
        )}
      </div>
    </SectionWrapper>
  );
};

export default Winnimap;
