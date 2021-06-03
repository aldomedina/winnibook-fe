import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import SearchBar from '../SearchBar';
import SearchResultsBox from '../SearchResultsBox';

import SEARCH_QUERY from '../../apollo/queries/search/searchLocalStoryCategoriesByName.gql';

const NavSearch = ({ searchRef, openSearch, setOpenSearch, isMobile }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState({});

  const [startSearch, {data: searchQuery, loading: searchLoading}] = useLazyQuery(SEARCH_QUERY);

  let searchTimeout;

  useEffect(() => {
    if (openSearch) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        startSearch({
          variables: {
            name: "%" + searchValue+ "%"
          }
        });
      }, 300);
    }
  }, [searchValue]);

  useEffect(() => {
    setSearchResults({
      locals: searchQuery?.winnibook_locals,
      stories: searchQuery?.winnibook_stories,
      categories: searchQuery?.winnibook_categories
    });

  }, [searchQuery]);

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
