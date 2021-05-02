import { useState, useEffect } from 'react';
import FilterBars from '../../components/FiltersBar';
import PlaceRow from '../../components/PlaceRow';
import { items } from '../../mock/search';

const Places = () => {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    console.log('activeFilters changed - new query string', activeFilters);
  }, [activeFilters]);

  return (
    <div className=" h-full">
      <div />
      <div className="h-full overflow-y-scroll scrollbar-hide">
        <ul className={`pt-16 ${filtersOpen ? 'pb-60vh' : 'pb-16'}`}>
          {items.map((item, i) => (
            <PlaceRow key={item.name + i} place={item} />
          ))}
        </ul>
      </div>
      <FilterBars
        filters={activeFilters}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
      />
    </div>
  );
};

export default Places;
