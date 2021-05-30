import { useState, useEffect } from 'react';
import { sortByName } from '../../utils';

import Tag from '../Tag';
import SearchBar from '../SearchBar';

const TagsSearch = ({ items, theme, onTagClick, searchPlaceholder, onSearchChange }) => {
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
          md:mb-6
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
          py-3 
          styled-scrollbar 
          max-h-30vh 
          overflow-x-scroll 
          md:overflow-y-auto 
          md:overflow-x-hidden 
          md:flex-wrap 
          md:justify-center
          gap-2
        "
      >
        {filteredItems &&
          sortByName(filteredItems).map(el => (
            <Tag key={el.id} filterTag name={el.name} onTagClick={onTagClick} tagInfo={el} />
          ))}
      </div>
    </div>
  );
};

export default TagsSearch;
