import { useState, useEffect } from 'react';
import { sortByName } from '../../utils';

import Tag from '../Tag';
import SearchBar from '../SearchBar';

const TagsSearch = ({ items, theme, handleHashtagClick, searchPlaceholder }) => {
  const [value, setValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let filtered = [...items];
    if (value)
      filtered = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  }, [value, items]);

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
          value={value}
          onChange={setValue}
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
            <Tag key={el.id} filterTag name={el.name} onTagCLick={handleHashtagClick} cat={el} />
          ))}
      </div>
    </div>
  );
};

export default TagsSearch;
