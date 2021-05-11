import styled from 'styled-components';
import Link from 'next/link';

import { Icon } from '../Icon';

const SearchResultsContainer = styled.div`
  transition: all 0.3s ease-in;
  height: ${({ $open }) => ($open ? '84vh' : '0vh')};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.15);
  transition: backdrop-filter 0.2s ease-in;
  backdrop-filter: ${({ $open }) => `blur(10px) opacity(${$open ? 1 : 0}) `};
`;

const SearchResultsBox = ({ openSearch, setOpenSearch, results, activeSearch }) => {
  return (
    <SearchResultsContainer
      $open={openSearch}
      className="absolute w-90vw md:w-full top-12 rounded-20p -left-11 md:left-0 -z-10 select-none overflow-hidden"
    >
      {openSearch && (
        <>
          <button
            onClick={() => setOpenSearch(false)}
            className="absolute right-5	top-5 cursor-pointer"
          >
            <Icon icon="x" />
          </button>
          <ul className="h-full overflow-y-auto overflow-x-hidden styled-scrollbar list-none">
            {results.length ? (
              results.map((el, i) => (
                <li
                  className={`uppercase text-lg px-5 first:mt-5 py-1 transition-transform transform hover:scale-105 cursor-pointer ${
                    i + 1 === results.length && 'mb-16'
                  }`}
                  key={el.id}
                >
                  <Link href="#">{el.name}</Link>
                </li>
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <span className="opacity-50">
                  {activeSearch.length ? 'No results' : 'Search something…'}
                </span>
              </div>
            )}
          </ul>
          <Link href={`/places`}>
            <button className="btn btn-outline shadow-md absolute bottom-5 right-5 ">
              advance search
            </button>
          </Link>
        </>
      )}
    </SearchResultsContainer>
  );
};

export default SearchResultsBox;
