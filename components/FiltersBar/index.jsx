import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  onFiltersChange,
  availableFilters
}) => {
  const router = useRouter();

  const [activeFilters, setActiveFilters] = useState([]);

  const [categories, setCategories] = useState([]);

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
    if (onFiltersChange) {
      onFiltersChange(router.query);
    }

    if (router.query.theme) {
      setColorTheme(router.query.theme);
    }

    mountActiveFilters();
  }, [router.query]);

  const setQuery = (filters) => {
    router.push(
      {
        pathname: '/places',
        query: filters
      }, 
      undefined, 
      { 
        shallow: true
      }
    );
  }

  const mountActiveFilters = () => {

    let tempActiveFilters = [];

    if (router.query.mainCategory) {
      tempActiveFilters.push({
        id: router.query.mainCategory,
        name: router.query.mainCategoryName,
        type: "mainCategory"
      })
    }

    if (router.query.categories) {

      for (let index = 0; index < router.query.categoriesName.length; index++) {
        const element = router.query.categoriesName[index];

        tempActiveFilters.push({
          id: router.query.categories[index],
          name: element,
          type: "category"
        })
        
      }
    }

    if (router.query.tags) {
      
      if (Array.isArray(router.query.tags)) {
        for (let index = 0; index < router.query.tagsName.length; index++) {
          const element = router.query.tagsName[index];
  
          tempActiveFilters.push({
            id: router.query.tags[index],
            name: element,
            type: "tags"
          })
          
        }
      } else {
        tempActiveFilters.push({
          id: router.query.tags,
          name: router.query.tagsName,
          type: "tags"
        })
      }
    }

    if (router.query.regions) {
      
      if (Array.isArray(router.query.regions)) {
        for (let index = 0; index < router.query.regionsName.length; index++) {
          const element = router.query.regionsName[index];
  
          tempActiveFilters.push({
            id: router.query.regions[index],
            name: element,
            type: "regions"
          })
          
        }
      } else {
        tempActiveFilters.push({
          id: router.query.regions,
          name: router.query.regionsName,
          type: "regions"
        })
      }
    }

    setActiveFilters(tempActiveFilters);
  }

  const selectCategory = cat => {

    if (router.query.categories?.includes(cat.id) || router.query.categories === cat.id) {
      removeFilter({
        ...cat,
        type: "categories"
      });
      return;
    }

    setQuery({
      ...router.query,
      mainCategory: cat.id,
      mainCategoryName: cat.name,
      categories: !cat.parent_category_id ? [] : router.query.categories,
      categoriesName: !cat.parent_category_id ? [] : router.query.categoriesName,
      theme: cat.theme
    });
  };

  const selectRegion = region => {
    let tempRegions = [],
        tempRegionsName = [];

    if (router.query.regions?.includes(region.id) || router.query.regions === region.id) {
      removeFilter({
        ...region,
        type: "regions"
      });
      return;
    }
    

    if (Array.isArray(router.query.regions)) {
      tempRegions = tempRegions.concat(router.query.regions);
      tempRegionsName = tempRegionsName.concat(router.query.regionsName);
    } else if (!!router.query.regions) {
      tempRegions.push(router.query.regions);
      tempRegionsName.push(router.query.regionsName);
    }

    tempRegions.push(region.id);
    tempRegionsName.push(region.name);

    setQuery({
      ...router.query,
      regions: tempRegions,
      regionsName: tempRegionsName,
    });
  };

  const selectTag = tag => {
    let tempTags = [],
        tempTagsName = [];

    if (router.query.tags?.includes(tag.id) || router.query.tags === tag.id) {
      removeFilter({
        ...tag,
        type: "tags"
      });
      return;
    }

    if (Array.isArray(router.query.tags)) {
      tempTags = tempTags.concat(router.query.tags);
      tempTagsName = tempTagsName.concat(router.query.tagsName);
    } else if (!!router.query.tags) {
      tempTags.push(router.query.tags);
      tempTagsName.push(router.query.tagsName);
    }

    tempTags.push(tag.id);
    tempTagsName.push(tag.name);

    console.log(tempTags);

    setQuery({
      ...router.query,
      tags: tempTags,
      tagsName: tempTagsName,
    });
  };

  const handleSearchBarChange = e => {
    
    setQuery({
      ...router.query,
      name: e
    })
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
        tempFilters = router.query;

    if (aFilter.type === "mainCategory") {
      tempActiveFilters = activeFilters.filter((item) => item.id !== aFilter.id && aFilter.type !== 'categories');
      delete tempFilters[aFilter.type];
      setColorTheme('base');
    } else {

      tempActiveFilters = activeFilters.filter((item) => item.id !== aFilter.id);

      if (Array.isArray(tempFilters[aFilter.type])) {
        tempFilters[aFilter.type] = tempFilters[aFilter.type].filter((item) => item !== aFilter.id);
        tempFilters[aFilter.type + "Name"] = tempFilters[aFilter.type + "Name"].filter((item) => item !== aFilter.name);
      } else {
        tempFilters[aFilter.type] = [];
        tempFilters[aFilter.type + "Name"] = [];
      }

      if (!tempFilters[aFilter.type].length) {
        delete tempFilters[aFilter.type];
      }
    }

    setQuery(tempFilters);
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
            value={router.query.name}
            big
          />
        </div>

        {/* ACTIVE FILTERS TAGS */}
        <div className="
          justify-self-stretch 

          flex 
          flex-wrap 
        
          max-h-32 
          overflow-y-auto 
          gap-2 
          md:gap-0.5 
          
          row-start-2 
          col-span-full 
          
          md:row-auto 
          md:col-auto
        ">
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

        {
          !availableFilters || availableFilters.includes('region') ?
            <TagsSearch
              items={regions}
              searchPlaceholder="FIND REGION"
              theme={colorTheme}
              onSearchChange={searchRegions}
              onTagClick={selectRegion}
            ></TagsSearch>
          : ""
        }

        {
          !availableFilters || availableFilters.includes('categories') ?
          (
            categories && categories.length ? (
              <div className="
                flex-1

                mt-2
                md:mt-0 

                border-b
                md:border-0
              ">

                <div className="flex py-3 flex-wrap justify-center gap-2">
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
            )
          )
          : ""
        }
        
        {
          !availableFilters || availableFilters.includes('tags') ?
            <TagsSearch
              items={tags}
              searchPlaceholder="FIND TAG"
              theme={colorTheme}
              onSearchChange={searchTags}
              onTagClick={selectTag}
            ></TagsSearch>
          : ""
        }
        
      </div>

    </animated.div>
  );
};

export default FilterBars;
