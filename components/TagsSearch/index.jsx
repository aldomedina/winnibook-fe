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
          flex-wrap 
          justify-center

          py-3
          mt-2
          md:mt-0 

          overflow-y-auto 
          overflow-x-hidden 
          
          gap-2

          md:border-0
        "
      >
        {filteredItems &&
          sortByName(filteredItems).map(el => (
            <Tag key={el.id} name={el.name} theme={el.theme?el.theme:undefined} filterTag={el.theme?false:true} onTagClick={onTagClick} tagInfo={el} big/>
          ))}
      </div>
    </div>
  );
};

export default TagsSearch;
