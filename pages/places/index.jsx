import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import TopNav from '../../components/TopNav';
import FilterBars from '../../components/FiltersBar';
import PlaceRow from '../../components/PlaceRow';

import { items } from '../../mock/search';

const PlacesSearchResults = styled.div`
  
`;

const Places = () => {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [openPlace, setOpenPlace] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const router = useRouter();
  
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const rowRef = useRef(null);
  const filtersRef = useRef(null);
  const filtersHeaderRef = useRef(null);

  useEffect(() => {
    console.log('activeFilters changed - new query string', activeFilters);
    console.log('openPlace', openPlace);
  }, [activeFilters, openPlace]);

  const handlePlaceRowClick = () => {
    // rowRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <PlacesSearchResults
      style={
        {
          paddingBottom: (filtersHeaderRef.current?.clientHeight) + "px",
        }
      }
    >
      <TopNav
        reference={headerRef} 
        hasBG
      />

      <ul
        className={`
          scrollbar-hide 
          ${
            !!openPlace ? 
              'overflow-y-hidden' 
            : 
            'overflow-y-scroll'
          }
        `}
      >
        {items.map((item, i) => (
          <PlaceRow
            key={item.name + i}
            place={item}
            listRef={listRef}
            rowRef={rowRef}
            index={i}
            openPlace={openPlace === i}
            setOpenPlace={setOpenPlace}
            onRowHeaderClick={handlePlaceRowClick}
          />
        ))}
      </ul>

      <FilterBars
        reference={filtersRef}
        headerReference={filtersHeaderRef}
        filters={activeFilters}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
        hidden={openPlace !== false}
      />
    </PlacesSearchResults>
  );
};

export default Places;
