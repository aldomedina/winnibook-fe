import { useState, useEffect } from 'react';
import { sortByName } from '../../utils';

import Tag from '../Tag';
import SearchBar from '../SearchBar';
const SearchByTag = ({ items, theme, handleHashtagClick }) => {
  const [value, setValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let filtered = [...items];
    if (value)
      filtered = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  }, [value, items]);

  return (
    <div className="flex-1">
      <div className="w-full">
        <SearchBar
          value={value}
          onChange={setValue}
          buttonIcon
          placeholder="SEARCH BY TAG"
          theme={theme}
        />
      </div>
      <div className="flex styled-scrollbar max-h-30vh overflow-x-scroll md:overflow-y-auto md:overflow-x-hidden md:flex-wrap md:justify-center md:mt-20 gap-2">
        {filteredItems &&
          sortByName(filteredItems).map(el => (
            <Tag key={el.id} filterTag name={el.name} onTagCLick={handleHashtagClick} cat={el} />
          ))}
      </div>
    </div>
  );
};

export default SearchByTag;
