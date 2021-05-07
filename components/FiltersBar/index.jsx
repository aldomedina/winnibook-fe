import { useState, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import Select from '../Select';
import useWindowSize from '../Hooks/useWindowSize';
import { filters as mock } from '../../mock/search';
import { getItemByKey, removeItemById, sortByName } from '../../utils';
import SearchBar from '../SearchBar';
import Tag from '../Tag';
import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';
import { useEffect } from 'react';
import SearchByTag from './SearchByTag';
import FiltersIcon from './FiltersIcon';

const mainCategoryId = 'main-category';
const subCategoryId = 'sub-category';
const hashtagId = 'hashtag';
const locationId = 'location';
const searchbarId = 'text';

const FilterBars = ({
  open,
  setOpen,
  filters,
  setFilters,
  reference,
  headerReference,
  hideFilters
}) => {
  const { locations, categories, hashtags } = mock; // 🚨  MOCK ALERT 🚨
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [categoriesDisplayed, setCategoriesDisplayed] = useState([]);
  const [hashtagsDisplayed, setHashtagsDisplayed] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState('');

  const { height } = useWindowSize();
  const { setColorTheme, colorTheme } = useContext(ColorContext);
  const hideValue = height ? height * 0.5 : 0;
  const openMenuAnimation = useSpring({
    transform: hideFilters
      ? `translate3d(0px,${height}px,0px)`
      : open
      ? `translate3d(0px,0px,0px)`
      : `translate3d(0px,${hideValue}px,0px)`,
    backgroundColor: colorTheme === 'base' ? '#ffffff' : themeConfig.colors[colorTheme].bg
  });

  useEffect(() => {
    setCategoriesDisplayed(categories);
    setHashtagsDisplayed(hashtags);
  }, []);

  const addNewFilter = newFilter => {
    if (newFilter.type === mainCategoryId && newFilter.theme) {
      setColorTheme(newFilter.theme);
    }
    setFilters(f => [...f, newFilter]);
  };

  const removeFilter = filter => {
    const newFilterState = removeItemById(filters, filter.id);
    setFilters(newFilterState);
    const selectedFilter = getItemByKey(filters, filter.id, 'id');

    const isLocation = selectedFilter.type === locationId;
    if (isLocation) {
      const newLocationState = removeItemById(selectedLocations, filter.id);
      setSelectedLocations(newLocationState);
    }

    const isMainCategory = selectedFilter.type === mainCategoryId;
    if (isMainCategory && selectedFilter.theme) {
      setColorTheme('base');
      const copy = [...filters];
      const removedSubCategories = copy.filter(
        el => el.type !== subCategoryId && el.type !== mainCategoryId
      );
      setFilters(removedSubCategories);
      setCategoriesDisplayed(categories);
    }

    if (selectedFilter.type === subCategoryId) {
      setCategoriesDisplayed([...categoriesDisplayed, filter]);
    }

    if (selectedFilter.type === hashtagId) {
      setHashtagsDisplayed([...hashtagsDisplayed, filter]);
    }
    if (selectedFilter.type === searchbarId) {
      setSearchBarValue('');
    }
  };

  const handleCategoryClick = cat => {
    addNewFilter({ ...cat, type: cat.isMain ? mainCategoryId : subCategoryId });
    if (cat.isMain) {
      setCategoriesDisplayed(cat.subcategories);
    } else {
      const removedSubcategory = removeItemById(categoriesDisplayed, cat.id);
      setCategoriesDisplayed(removedSubcategory);
    }
  };

  const handleHashtagClick = hashtag => {
    addNewFilter({ ...hashtag, type: hashtagId });
    const removedHashtag = removeItemById(hashtagsDisplayed, hashtag.id);
    setHashtagsDisplayed(removedHashtag);
  };

  const handleLocationChange = (list, item) => {
    setSelectedLocations(selectedLocations => [...selectedLocations, item.option]);
    addNewFilter({ ...item.option, type: locationId });
  };

  const handleSearchBarChange = e => {
    const filterIndex = filters.findIndex(f => f.type === searchbarId);
    setSearchBarValue(e);
    if (filterIndex >= 0) {
      const copy = [...filters];
      copy[filterIndex] = { ...copy[filterIndex], name: e };
      setFilters(copy);
    } else {
      const newFilter = { name: e, id: searchbarId, type: searchbarId };
      setFilters(f => [...f, newFilter]);
    }
  };

  return (
    <animated.div
      ref={reference}
      style={openMenuAnimation}
      className="w-full shadow-reverse rounded-t-20p md:rounded-t-50p fixed bottom-0 left-0 z-20 flex flex-col"
    >
      <div
        ref={headerReference}
        className="w-full min-h-16 gap-3 py-3 px-3 md:px-10 grid-cols-filters-small grid md:grid-cols-filters grid-rows-filters md:grid-rows-1"
      >
        <div className="h-full max-h-8 min-w-20vw ">
          <SearchBar
            noIcon
            placeholder="SEARCH..."
            onChange={handleSearchBarChange}
            theme={colorTheme}
            value={searchBarValue}
          />
        </div>

        <div className="flex flex-wrap max-h-32 overflow-y-auto gap-2 md:gap-0.5  justify-self-stretch row-start-2 col-span-full md:row-auto md:col-auto	">
          {filters.map(filter => (
            <Tag
              key={`selected-${filter.id}`}
              name={filter.name}
              cat={filter}
              filterTag
              handleRemoveClick={removeFilter}
            />
          ))}
        </div>
        <button onClick={() => setOpen(open => !open)} className="w-11 self-start relative">
          <FiltersIcon isOpen={open} theme={colorTheme} />
        </button>
      </div>
      <div className="container min-h-50vh flex-1 h-full md:py-4 flex flex-col md:flex-row justify-between items-stretch gap-3 md:gap-10 ">
        <div className="flex-1 pt-5 md:pt-0 ">
          <div className=" w-72 md:-mt-1.5">
            <Select
              isMulti
              controlShouldRenderValue={false}
              options={locations}
              getOptionLabel={el => el.name}
              getOptionValue={el => el.id}
              value={selectedLocations}
              isClearable={false}
              onChange={handleLocationChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="SEARCH BY LOCATION"
              theme={theme => ({
                ...theme,
                colors: {
                  neutral0: themeConfig.colors[colorTheme].bg
                }
              })}
            />
          </div>
        </div>
        {categoriesDisplayed && categoriesDisplayed.length ? (
          <div className="flex-1">
            <h3 className="uppercase opacity-30 ml-3 md:ml-0 md:text-center md:mb-5">
              search by categories
            </h3>

            <div className="flex py-3  styled-scrollbar max-h-30vh overflow-x-scroll md:overflow-y-auto md:overflow-x-hidden md:flex-wrap md:justify-center md:mt-10 gap-2">
              {sortByName(categoriesDisplayed).map(cat => (
                <Tag
                  key={cat.id}
                  name={cat.name}
                  theme={cat.theme}
                  invertColors={cat.isMain}
                  onTagCLick={handleCategoryClick}
                  cat={cat}
                  big={cat.isMain}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h3 className="uppercase opacity-30 ml-3 md:ml-0 md:text-center mb-5 self-center">
              No Categories left...
            </h3>
          </div>
        )}
        <SearchByTag
          items={hashtagsDisplayed}
          theme={colorTheme}
          handleHashtagClick={handleHashtagClick}
        />
      </div>
    </animated.div>
  );
};

export default FilterBars;
