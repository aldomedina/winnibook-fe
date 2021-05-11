import { useEffect } from 'react';
import { useState } from 'react';
import SearchBar from '../SearchBar';
import SearchResultsBox from '../SearchResultsBox';
import { items } from '../../mock/search';

const NavSearch = ({ searchRef, openSearch, setOpenSearch, isMobile }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const fetchSearchResults = async value => {
      // 🚨  MOCK ALERT 🚨 TODO: create dynamic query with value
      const filtered = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      setSearchResults(filtered);
    };
    searchValue?.length ? fetchSearchResults(searchValue) : setSearchResults([]);
  }, [searchValue]);
  return (
    <div ref={searchRef} className="flex-1 relative md:max-w-40vw w-full md:mr-10 ">
      <SearchBar buttonIcon={isMobile} value={searchValue} onChange={setSearchValue} />
      <SearchResultsBox
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        activeSearch={searchValue}
        results={searchResults}
      />
    </div>
  );
};

export default NavSearch;
