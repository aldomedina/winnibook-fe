import styled from 'styled-components';

const SearchResultsContainer = styled.div`
  transition: all 0.3s ease-in;
  height: ${({ $open }) => ($open ? '84vh' : '0vh')};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.15);
  transition: backdrop-filter 0.2s ease-in;
  backdrop-filter: ${({ $open }) => `blur(10px) opacity(${$open ? 1 : 0}) `};
`;

const SearchResultsBox = ({ openSearch }) => {
  return (
    <SearchResultsContainer
      $open={openSearch}
      className="absolute w-90vw md:w-full top-12 rounded-20p -left-11 md:left-0 -z-10 select-none"
    ></SearchResultsContainer>
  );
};

export default SearchResultsBox;
