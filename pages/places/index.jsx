import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import TopNav from '../../components/TopNav';
import FilterBars from '../../components/FiltersBar';

import PlaceRowHeader from '../../components/PlaceRow/PlaceRowHeader';

import { sortByName } from '../../utils';
import { items } from '../../mock/search';

const PlacesSearchResults = styled.div`
  min-height: 100vh;

  a {
    max-height: 56px;
    opacity: 1;
    transition: max-height .4s .4s, opacity .3s;

    &.hidden-place {
      overflow: hidden;
      max-height: 0 !important;
      opacity: 0 !important;
    }
  }
`;

const Places = () => {
  const router = useRouter();
  
  const headerRef = useRef(null); 
  const rowRef = useRef(null); 
  const filtersRef = useRef(null);
  const filtersHeaderRef = useRef(null);

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filtersHidden, setFiltersHidden] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const [openPlace, setOpenPlace] = useState(false);
  
  useEffect(() => {
    setOpenPlace(false);
    setFiltersHidden(false);
  }, []);

  const handlePlaceClick = (e, i) => {
    if (e.nativeEvent?.metaKey || e.nativeEvent?.controlKey) {
      return;
    }

    e.preventDefault();
    
    setOpenPlace(i);
    setFiltersHidden(true);

    window.scrollTo(0, 0);

    // after all transitions
    setTimeout(async () => {
      await router.push("place/" + i);
    }, 600);
  }

  return (
    <PlacesSearchResults
      style={
        {
          paddingBottom: (filtersHeaderRef.current?.clientHeight) + "px",
          overflow: openPlace !== false ? "hidden" : "auto"
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
        `}
      >
        {items.map((item, i) => (
          <a
            key={i} 
            style={{
              maxHeight: rowRef.current?.clientHeight + "px"
            }}
            className={"block " + (openPlace !== false && openPlace !== i ? "hidden-place" : "")}
            href={"place/" + i}
            onClick={(e) => handlePlaceClick(e, i)}
          >
            <PlaceRowHeader
              reference={rowRef}
              name={item.name}
              city={item.city}
              categories={sortByName(item.categories.slice(0, 2))}
              isOpen={openPlace === i}
            />
          </a>
        ))}
      </ul>

      <FilterBars
        reference={filtersRef}
        headerReference={filtersHeaderRef}
        filters={activeFilters}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
        hidden={filtersHidden}
      />
    </PlacesSearchResults>
  );
};

export default Places;
