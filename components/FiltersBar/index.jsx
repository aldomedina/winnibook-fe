import { useState, useContext, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useQuery } from '@apollo/client';

import GET_ALL_MAIN_CATEGORIES from '../../apollo/queries/categories/getAllMainCategories.gql';
import GET_CITIES_BY_NAME from '../../apollo/queries/address/getAllCitiesByName.gql';
import GET_TAGS_BY_NAME from '../../apollo/queries/tags/getAllTagsByName.gql';

import { getItemByKey, removeItemById, sortByName } from '../../utils';

import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';

import Tag from '../Tag';
import SearchBar from '../SearchBar';
import TagsSearch from '../TagsSearch';
import FiltersIcon from './FiltersIcon';

import { filters as mock } from '../../mock/search';

const mainCategoryId = 'main-category';
const subCategoryId = 'sub-category';
const hashtagId = 'hashtag';
const locationId = 'location';
const searchbarId = 'text';

const FilterBars = ({
  open,
  setOpen,
  reference,
  headerReference,
  hidden,
  onFiltersChange
}) => {
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);

  const [categories, setCategories] = useState([]);

  // SEARCH BAR
  const [searchBarValue, setSearchBarValue] = useState('');

  // REGIONS
  const [regions, setRegions] = useState([]);
  const [searchRegionsValue, setSearchRegionsValue] = useState('');

  // TAGS
  const [tags, setTags] = useState([]);
  const [searchTagsValue, setSearchTagsValue] = useState('');

  const { setColorTheme, colorTheme } = useContext(ColorContext);

  let searchTimeout;

  const {data: categoriesQuery, loading: categoriesLoading} = useQuery(GET_ALL_MAIN_CATEGORIES);
  const {data: regionsQuery, loading: regionsLoading} = useQuery(GET_CITIES_BY_NAME, {
    variables: {
      name: "%" + searchRegionsValue + "%",
      limit: 8
    }
  });
  const {data: tagsQuery, loading: tagsLoading} = useQuery(GET_TAGS_BY_NAME, {
    variables: {
      name: "%" + searchTagsValue + "%",
      limit: 8
    }
  });

  const openMenuAnimation = useSpring({
    transform: 
      hidden ? 
        `translate3d(0px,${reference.current?.clientHeight}px,0px)`
      : 
      open ? 
        `translate3d(0px,0px,0px)`
      : 
        `translate3d(0px,${(reference.current?.clientHeight - headerReference.current?.clientHeight)}px,0px)`,
    backgroundColor: colorTheme === 'base' ? '#ffffff' : themeConfig.colors[colorTheme].bg
  });

  useEffect(() => {
    setCategories(categoriesQuery ? categoriesQuery.winnibook_categories : []);
  }, [categoriesQuery]);

  useEffect(() => {
    setRegions(regionsQuery ? regionsQuery.winnibook_cities : []);
  }, [regionsQuery]);

  useEffect(() => {
    setTags(tagsQuery ? tagsQuery.winnibook_tags : []);
  }, [tagsQuery]);

  useEffect(() => {
    setFilters({
      ...filters,
      name: searchBarValue
    })
  }, [searchBarValue]);

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [JSON.stringify(filters)]);

  const selectCategory = cat => {
    const newFilter = { 
      ...cat, 
      type: !cat.parent_category_id ? "mainCategory" : "categories"
    };
    let tempActiveFilters = activeFilters;

    if (newFilter.type === "mainCategory" && newFilter.theme) {
      setColorTheme(newFilter.theme);

      tempActiveFilters = activeFilters.filter((item) => item.type !== "mainCategory" && item.type !== "categories");
    }

    tempActiveFilters.unshift(newFilter);

    setActiveFilters(tempActiveFilters);
    setFilters({
      ...filters,
      mainCategory: newFilter.id
    });
  };

  const selectRegion = region => {
    const newFilter = { 
      ...region, 
      type: "regions"
    };
    let tempActiveFilters = activeFilters;

    tempActiveFilters.push(newFilter);

    setActiveFilters(tempActiveFilters);
    setFilters({
      ...filters,
      regions: tempActiveFilters.filter((item) => item.type==="regions").map((item) => item.id)
    });
  };

  const selectTag = region => {
    const newFilter = { 
      ...region, 
      type: "tags"
    };
    let tempActiveFilters = activeFilters;

    tempActiveFilters.push(newFilter);

    setActiveFilters(tempActiveFilters);
    setFilters({
      ...filters,
      tags: tempActiveFilters.filter((item) => item.type==="tags").map((item) => item.id)
    });
  };

  const handleSearchBarChange = e => {
    setSearchBarValue(e);
  };

  const searchRegions = (aSearchValue) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchRegionsValue(aSearchValue);
    }, 300)
  }

  const searchTags = (aSearchValue) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchTagsValue(aSearchValue);
    }, 300)
  }

  const removeFilter = (aFilter) => {
    let tempActiveFilters,
        tempFilters = filters;

    if (aFilter.type === "mainCategory") {
      tempActiveFilters = activeFilters.filter((item) => item.id !== aFilter.id && aFilter.type !== 'categories');
      delete tempFilters[aFilter.type];
      setColorTheme('base');
    } else {
      tempActiveFilters = activeFilters.filter((item) => item.id !== aFilter.id);
      tempFilters[aFilter.type] = tempFilters[aFilter.type].filter((item) => item !== aFilter.id);

      if (!tempFilters[aFilter.type].length) {
        delete tempFilters[aFilter.type];
      }
    }

    setFilters(tempFilters);
    setActiveFilters(tempActiveFilters);
  }

  return (
    <animated.div
      ref={reference}
      style={openMenuAnimation}
      className="w-full shadow-reverse rounded-t-20p md:rounded-t-50p fixed bottom-0 left-0 z-20 flex flex-col"
    >

      {/* FILTERS HEADER */}
      <div
        ref={headerReference}
        className="
          w-full 
          min-h-16 
          gap-3

          py-4 
          px-3 
          md:px-6

          grid-cols-filters-small 
          grid 
          md:grid-cols-filters 
          grid-rows-filters 
          md:grid-rows-1
        "
        onClick={() => setOpen(open => !open)}
      >

        {/* SEARCH BAR */}
        <div 
          className="h-full min-w-40vw "
          onClick={(evt) => evt.stopPropagation()}>
          <SearchBar
            noIcon
            placeholder="SEARCH..."
            onChange={handleSearchBarChange}
            theme={colorTheme}
            value={searchBarValue}
            big
          />
        </div>

        {/* ACTIVE FILTERS TAGS */}
        <div className="flex flex-wrap max-h-32 overflow-y-auto gap-2 md:gap-0.5  justify-self-stretch row-start-2 col-span-full md:row-auto md:col-auto">
          {activeFilters.map(filter => (
            <Tag
              key={`selected-${filter.id}`}
              name={filter.name}
              tagInfo={filter}
              filterTag
              handleRemoveClick={() => removeFilter(filter)}
            />
          ))}
        </div>

        {/* TOGGLE FILTERS */}
        <button className="w-11 py-2 self-start relative">
          <FiltersIcon isOpen={open} theme={colorTheme} />
        </button>

      </div>

      {/* ADVANCED FILTERS */}
      <div 
        className="
          min-h-35vh 
          h-full 

          flex-1 
          flex 
          flex-col
          md:flex-row 
          justify-between 
          items-stretch 
          gap-3 
          md:gap-10

          px-3 
          md:px-6

          md:pt-10 
          md:pb-7 
        "
      >

        <TagsSearch
          items={regions}
          searchPlaceholder="FIND REGION"
          theme={colorTheme}
          onSearchChange={searchRegions}
          onTagClick={selectRegion}
        />

        {categories && categories.length ? (
          <div className="flex-1">

            <div className="flex py-3  styled-scrollbar max-h-30vh overflow-x-scroll md:overflow-y-auto md:overflow-x-hidden md:flex-wrap md:justify-center gap-2">
              {sortByName(categories).map(cat => (
                <Tag
                  key={cat.id}
                  name={cat.name}
                  theme={cat.theme}
                  invertColors={!cat.parent_category_id}
                  onTagClick={() => selectCategory(cat)}
                  tagInfo={cat}
                  big
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h3 className="uppercase opacity-30 ml-3 md:ml-0 md:text-center mb-5 self-center">
              No Categories
            </h3>
          </div>
        )}

        <TagsSearch
          items={tags}
          searchPlaceholder="FIND TAG"
          theme={colorTheme}
          onSearchChange={searchTags}
          onTagClick={selectTag}
        />
      </div>

    </animated.div>
  );
};

export default FilterBars;
