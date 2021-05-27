import { useEffect, useState } from 'react';
import { useRef } from 'react';

import getPlaceDetails from '../../mock/place';
import { sortByName } from '../../utils';

import PlaceRowBody from './PlaceRowBody';
import PlaceRowHeader from './PlaceRowHeader';

const PlaceRow = ({ place, openPlace, setOpenPlace, onRowHeaderClick, rowRef, isSingle }) => {
  const { name, city, categories=[] } = place;

  const [isLoading, setIsLoading] = useState(false);
  const headerRef = useRef(null);
  const headerHeight = headerRef?.current?.offsetHeight;

  return (
    <li ref={rowRef} className="relative list-none mb-1 md:mb-2">
      <PlaceRowHeader
        reference={headerRef}
        name={name}
        city={city}
        categories={sortByName(categories.slice(0, 2))}
        // onRowHeaderClick={handleRowHeaderClick}
        isOpen={openPlace}
        isSingle={isSingle}
      />
      
      <PlaceRowBody
        isOpen={openPlace}
        headerHeight={headerHeight}
        data={place}
        isLoading={isLoading}
      />
    </li>
  );
};

export default PlaceRow;

// sortByName(place.categories.slice(0, 2))
