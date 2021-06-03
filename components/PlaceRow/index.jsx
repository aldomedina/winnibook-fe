import { useEffect, useState } from 'react';
import { useRef } from 'react';

import { sortByName } from '../../utils';

import PlaceRowBody from './PlaceRowBody';
import PlaceRowHeader from './PlaceRowHeader';

const PlaceRow = ({ place, openPlace, rowRef, isSingle }) => {
  const { name, city, categories=[] } = place;

  const [isLoading, setIsLoading] = useState(false);
  const [showPlaceBody, setShowPlaceBody] = useState(false);
  const headerRef = useRef(null);
  const headerHeight = headerRef?.current?.offsetHeight;

  useEffect(() => {
    setShowPlaceBody(true);
  }, []);

  return (
    <li ref={rowRef} className="relative list-none mb-1 md:mb-2">
      <PlaceRowHeader
        reference={headerRef}
        name={name}
        city={city}
        categories={sortByName(categories.slice(0, 2))}
        isOpen={openPlace}
        isSingle={isSingle}
      />
      
      {
        showPlaceBody ? 
        <PlaceRowBody
          isOpen={openPlace}
          headerHeight={headerHeight}
          data={place}
          isLoading={isLoading}
        /> : ""
      }
    </li>
  );
};

export default PlaceRow;

// sortByName(place.categories.slice(0, 2))
