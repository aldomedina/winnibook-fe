import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { sortByName } from '../../utils';
import useMeasure from '../Hooks/useMeasure';
import PlaceRowBody from './PlaceRowBody';
import PlaceRowHeader from './PlaceRowHeader';

const PlaceRow = ({ place, index, openPlace, setOpenPlace }) => {
  const { name, location, categories } = place; // 🚨  MOCK ALERT 🚨
  const isOpen = index === openPlace;
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

  return (
    <li ref={rowRef} className="container mb-1 md:mb-2">
      <PlaceRowHeader
        reference={headerRef}
        name={name}
        location={location}
        categories={sortByName(categories.slice(0, 2))}
        onRowHeaderClick={onRowHeaderClick}
        isOpen={isOpen}
      />
      <PlaceRowBody isOpen={isOpen} headerHeight={headerHeight} />
    </li>
  );
};

export default PlaceRow;

// sortByName(place.categories.slice(0, 2))
