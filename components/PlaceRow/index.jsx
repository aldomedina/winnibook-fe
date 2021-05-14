import { useEffect, useState } from 'react';
import { useRef } from 'react';
import getPlaceDetails from '../../mock/place';
import { sortByName } from '../../utils';
import PlaceRowBody from './PlaceRowBody';
import PlaceRowHeader from './PlaceRowHeader';

const PlaceRow = ({ place, index, openPlace, setOpenPlace }) => {
  const { name, city, categories } = place; // 🚨  MOCK ALERT 🚨
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const headerRef = useRef(null);
  const headerHeight = headerRef?.current?.offsetHeight;
  const rowRef = useRef(null);

  const onRowHeaderClick = () => {
    if (!openPlace) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpenPlace(index);
    } else {
      setOpenPlace(false);
    }
  };

  useEffect(() => {
    const fetchPlaceData = async () => {
      setIsLoading(true);
      const response = await getPlaceDetails();
      setData(response);
      setIsLoading(false);
    };

    openPlace && fetchPlaceData();
  }, [openPlace]);

  return (
    <li ref={rowRef} className="relative mb-1 md:mb-2">
      <PlaceRowHeader
        reference={headerRef}
        name={name}
        city={city}
        categories={sortByName(categories.slice(0, 2))}
        onRowHeaderClick={onRowHeaderClick}
        isOpen={openPlace}
      />
      <PlaceRowBody
        isOpen={openPlace}
        headerHeight={headerHeight}
        data={data}
        isLoading={isLoading}
      />
    </li>
  );
};

export default PlaceRow;

// sortByName(place.categories.slice(0, 2))
