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

const mainCategoryId = 'main-category';
const subCategoryId = 'sub-category';
const FilterBars = ({ open, setOpen, filters, setFilters }) => {
  const { locations, categories, hashtags } = mock; // <---- MOCK ALERT - to be integrated with BE

  const { height } = useWindowSize();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [categoriesDisplayed, setCategoriesDisplayed] = useState([]);
  const [hashtagsDisplayed, setHashtagsDisplayed] = useState([]);
  const { setColorTheme, colorTheme } = useContext(ColorContext);
  const hideValue = height ? height * 0.5 : 0;
  const openMenuAnimation = useSpring({
    transform: open ? `translate3d(0px,0px,0px)` : `translate3d(0px,${hideValue}px,0px)`,
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

    const isLocation = selectedFilter.type === 'location';
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

    const isSubCategory = selectedFilter.type === subCategoryId;
    if (isSubCategory) {
      setCategoriesDisplayed([...categoriesDisplayed, filter]);
    }

    const isHashtag = selectedFilter.type === 'hashtag';
    if (isHashtag) {
      setHashtagsDisplayed([...hashtagsDisplayed, filter]);
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
    addNewFilter({ ...hashtag, type: 'hashtag' });
    const removedHashtag = removeItemById(hashtagsDisplayed, hashtag.id);
    setHashtagsDisplayed(removedHashtag);
  };

  const handleLocationChange = (list, item) => {
    setSelectedLocations(selectedLocations => [...selectedLocations, item.option]);
    addNewFilter({ ...item.option, type: 'location' });
  };

  const handleSearchBarChange = e => console.log(e?.target?.value);

  return (
    <animated.div
      style={openMenuAnimation}
      className="w-full shadow-reverse rounded-t-20p md:rounded-t-50p fixed bottom-0 left-0 z-20 flex flex-col"
    >
      <div className="w-full min-h-16 flex flex-col md:flex-row py-3 px-3 md:px-10">
        <div className=" h-full flex min-w-20vw items-center mr-5">
          <SearchBar
            buttonIcon
            placeholder="SEARCH..."
            onChange={handleSearchBarChange}
            theme={colorTheme}
          />
        </div>

        <div className="flex-1 flex flex-wrap">
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
        <button onClick={() => setOpen(open => !open)} className="w-max self-start">
          close arrow
        </button>
      </div>
      <div className="container min-h-50vh flex-1 h-full py-4 flex flex-col md:flex-row justify-between items-stretch gap-10">
        <div className="flex-1">
          <div className="w-full -mt-1.5">
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
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="uppercase opacity-30 ml-3 md:ml-0 md:text-center mb-5">
            search by categories
          </h3>

          <div className="flex styled-scrollbar max-h-30vh overflow-x-scroll md:overflow-y-auto md:overflow-x-hidden md:flex-wrap md:justify-center md:mt-20 gap-2">
            {categoriesDisplayed &&
              sortByName(categoriesDisplayed).map(cat => (
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
