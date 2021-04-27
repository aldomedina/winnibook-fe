import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Select from '../Select';
import useWindowSize from '../Hooks/useWindowSize';
import { filters as mock } from '../../mock/search';
import { removeItemById } from '../../utils';

const FilterBars = ({ open, setOpen, filters, setFilters }) => {
  const { locations, categories, hashtags } = mock; // <---- MOCK ALERT - to be integrated with BE

  const { height } = useWindowSize();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const hideValue = height ? -52 + height / 2 : 0;
  const openMenuAnimation = useSpring({
    transform: open ? `translate3d(0px,0px,0px)` : `translate3d(0px,${hideValue}px,0px)`
  });
  const handleLocationChange = (list, item) => {
    setSelectedLocations(selectedLocations => [...selectedLocations, item.option]);
    addNewFilter(item.option);
  };
  const addNewFilter = newFilter => setFilters(f => [...f, newFilter]);
  const removeFilter = (filter, isLocation) => {
    const newFilterState = removeItemById(filters, filter.id);
    const newLocationState = removeItemById(selectedLocations, filter.id);
    setFilters(newFilterState);
    isLocation && setSelectedLocations(newLocationState);
  };

  return (
    <animated.div
      style={openMenuAnimation}
      className="w-full h-50vh bg-white shadow-reverse fixed bottom-0 left-0 z-20 flex flex-col"
    >
      <div className="w-full flex py-3 px-10">
        <div className="flex-1 flex">
          {filters.map(el => (
            <div key={el.id}>
              <span>{el.name}</span>
              <button onClick={() => removeFilter(el, true)}>x</button>
            </div>
          ))}
        </div>
        <button onClick={() => setOpen(open => !open)} className="w-max self-end">
          close arrow
        </button>
      </div>
      <div className="container flex-1">
        <div className="h-full py-10 flex justify-between">
          <div className="h-full flex-1 flex justify-center items-center">
            <div className="w-48">
              <Select
                isMulti
                controlShouldRenderValue={false}
                options={mock.locations}
                getOptionLabel={el => el.name}
                getOptionValue={el => el.id}
                value={selectedLocations}
                isClearable={false}
                onChange={handleLocationChange}
              />
            </div>
          </div>
          <div className="h-full flex-1 flex justify-center items-center">filter</div>
          <div className="h-full flex-1 flex justify-center items-center">filter</div>
        </div>
      </div>
    </animated.div>
  );
};

export default FilterBars;
