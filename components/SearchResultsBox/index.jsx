import styled from 'styled-components';
import Link from 'next/link';

import { Icon } from '../Icon';

const SearchResultsContainer = styled.div`
  transition: height .6s, opacity .3s .3s;

  height: ${({ $open }) => ($open ? '50vh' : '0vh')};

  opacity: ${({ $open }) => ($open ? '1' : '0')};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, .95);
  backdrop-filter: blur(10px);
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
                  key={`${el.id}-${i}`}
                  className={` text-lg px-5 first:mt-5 py-1  ${
                    i + 1 === results.length && 'mb-16'
                  }`}
                >
                  <Link href={`/places/${el.slug}`}>
                    <div
                      className="uppercase w-full transition-transform transform hover:translate-x-1  cursor-pointer"
                      onClick={() => setOpenSearch(false)}
                    >
                      {el.name}
                    </div>
                  </Link>
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

          <Link href={`/places?s=${activeSearch}`}>
            <button className="btn btn-outline shadow-md absolute bottom-5 right-5 ">
              advanced search
            </button>
          </Link>
        </>
      )}
    </SearchResultsContainer>
  );
};

export default SearchResultsBox;
