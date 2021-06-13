import { useState, useEffect } from 'react';
import { sortByName } from '../../utils';

import PlaceCard from '../PlaceCard';
import SearchBar from '../SearchBar';

const LocalsSearch = ({ items, theme, onLocalClick, searchPlaceholder, onSearchChange }) => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <div 
      className="
        flex-1 
        flex 
        flex-col
      "
    >
      <div 
        className="
        "
      >
        <SearchBar
          onChange={onSearchChange}
          noIcon
          placeholder={searchPlaceholder ? searchPlaceholder : "SEARCH"}
          theme={theme}
        />
      </div>

      <div 
        className="
          flex 
          flex-wrap 
          justify-center

          py-3
          mt-2
          md:mt-0 

          overflow-y-auto 
          overflow-x-hidden 
          
          gap-2

          border-b
          md:border-0
        "
      >
        {filteredItems &&
          sortByName(filteredItems).map(item => (
            <div className="flex-grow" onClick={() => onLocalClick(item)}>
              <PlaceCard name={item.name} theme={item.main_category.theme} categories={[item.main_category]} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LocalsSearch;
