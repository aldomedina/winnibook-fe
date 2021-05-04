import { useState, useEffect, useRef } from 'react';
import FilterBars from '../../components/FiltersBar';
import useWindowSize from '../../components/Hooks/useWindowSize';
import PlaceRow from '../../components/PlaceRow';
import { items } from '../../mock/search';

const Places = () => {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [openPlace, setOpenPlace] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const listRef = useRef(null);
  const filtersRef = useRef(null);
  const filtersHeaderRef = useRef(null);
  const { height, isMobile } = useWindowSize();

  useEffect(() => {
    console.log('activeFilters changed - new query string', activeFilters);
    console.log('openPlace', openPlace);
  }, [activeFilters, openPlace]);

  return (
    <div className="h-full  overflow-hidden">
      <ul
        className={`scrollbar-hide ${!!openPlace ? 'overflow-y-hidden' : 'overflow-y-scroll'}`}
        style={{
          marginTop: isMobile ? 60 : 56,
          height: isMobile ? height - 56 : height - 52
        }}
      >
        {items.map((item, i) => (
          <PlaceRow
            key={item.name + i}
            place={item}
            listRef={listRef}
            index={i}
            openPlace={openPlace}
            setOpenPlace={setOpenPlace}
          />
        ))}
        <li
          style={{
            height: isMobile ? height - 156 : height - 104
          }}
        ></li>
      </ul>

      <FilterBars
        reference={filtersRef}
        headerReference={filtersHeaderRef}
        filters={activeFilters}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
        hideFilters={!!openPlace}
      />
    </div>
  );
};

export default Places;
