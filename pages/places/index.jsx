import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';

import GET_LOCALS from '../../apollo/queries/local/allLocalsForSearchPage.gql';
import GET_LOCALS_BY_NAME from '../../apollo/queries/search/searchByLocalName.gql';
import {mountSearchQuery} from '../../apollo/queries/search/searchQueryHelper';

import TopNav from '../../components/TopNav';
import FilterBars from '../../components/FiltersBar';

import PlaceRowHeader from '../../components/PlaceRow/PlaceRowHeader';

import { ColorContext } from '../../components/Theme';

import { sortByName } from '../../utils';

const PlacesSearchResults = styled.div`
  min-height: 100vh;

  a {
    max-height: 56px;
    opacity: 1;
    transition: max-height .4s .4s, opacity .3s;

    @media (max-width: 768px) {
      max-height: 100px;
    }

    &.hidden-place {
      overflow: hidden;
      max-height: 0 !important;
      opacity: 0 !important;
    }
  }
`;

const Places = () => {
  const router = useRouter();
  
  const headerRef = useRef(null); 
  const rowRef = useRef(null); 
  const filtersRef = useRef(null);
  const filtersHeaderRef = useRef(null);

  const [locals, setLocals] = useState([]);
  const [filters, setFilters] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersHidden, setFiltersHidden] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [openPlace, setOpenPlace] = useState(false);
  
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  let searchTimeout;

  const [searchQuery, {data: localsQueryResponse, loading, refetch}] =  useLazyQuery(mountSearchQuery(!!filters.name, !!filters.tags, !!filters.mainCategory, !!filters.categories, !!filters.regions));

  useEffect(() => {
    if (localsQueryResponse) {
      setLocals(localsQueryResponse.winnibook_locals);
    }
  }, [localsQueryResponse]);
  
  useEffect(() => {
    setOpenPlace(false);
    setFiltersHidden(false);
    setColorTheme('base');   
    
    console.log(router); 
  }, []);

  const searchLocals = (aFilters) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setFilters(aFilters);
      searchQuery(
        {
          variables: {
            name: "%" + aFilters.name + "%",
            tagIds: aFilters.tags ? aFilters.tags : [],
            mainCategoryId: aFilters.mainCategory ? aFilters.mainCategory : "9349ae64-be69-11eb-8529-0242ac130003",
            categoryIds: aFilters.categories ? aFilters.categories : [],
            cityIds: aFilters.regions ? aFilters.regions : [],
          }
        }
      )
    }, 500)
  }

  const handlePlaceClick = (e, i) => {
    if (e.nativeEvent?.metaKey || e.nativeEvent?.controlKey) {
      return;
    }

    e.preventDefault();
    
    setOpenPlace(i);
    setFiltersHidden(true);

    window.scrollTo(0, 0);

    // after all transitions
    setTimeout(async () => {
      await router.push("/place/" + i);
    }, 400);
  }

  return (
    <PlacesSearchResults
      style={
        {
          paddingBottom: (filtersHeaderRef.current?.clientHeight) + "px",
          overflow: openPlace !== false ? "hidden" : "auto"
        }
      }
    >
      <TopNav
        reference={headerRef} 
        hasBG
      />

      <div className="w-full">
        {locals.map((item, i) => (
          <a
            key={i}
            className={"block " + (openPlace !== false && openPlace !== item.id ? "hidden-place" : "")}
            href={"/place/" + item.id}
            onClick={(e) => handlePlaceClick(e, item.id)}
          >
            <PlaceRowHeader
              reference={rowRef}
              name={item.name}
              city={item.address.city.name}
              categories={sortByName(item.categories.slice(0, 1))}
              isOpen={openPlace === item.id}
            />
          </a>
        ))}
      </div>

      <FilterBars
        reference={filtersRef}
        headerReference={filtersHeaderRef}
        filters={activeFilters}
        onFiltersChange={searchLocals}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
        hidden={filtersHidden}
      />
    </PlacesSearchResults>
  );
};

export default Places;
