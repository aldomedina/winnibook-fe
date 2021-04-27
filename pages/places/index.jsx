import { useState } from 'react';
import FilterBars from '../../components/FiltersBar';
import PlaceRow from '../../components/PlaceRow';
import { items } from '../../mock/search';
const Places = () => {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  return (
    <div className="scrollbar-hide">
      <FilterBars
        filters={activeFilters}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
      />
      <div />
      <div className="scrollbar-hide">
        <ul className={`pt-16 ${filtersOpen ? 'pb-55vh' : 'pb-16'}`}>
          {items.map((item, i) => (
            <PlaceRow key={item.name + i} place={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Places;
