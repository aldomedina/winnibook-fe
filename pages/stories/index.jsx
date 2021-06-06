import { useState, useRef, Fragment, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import Link from 'next/link';

import useWindowSize from '../../components/Hooks/useWindowSize';

import TopNav from '../../components/TopNav';
import FilterBars from '../../components/FiltersBar';
import StoryCard from '../../components/StoryCard';
import RoundButton from '../../components/Buttons/RoundButton';

import {mountSearchQuery} from '../../apollo/queries/stories/searchQueryHelper';

import { ColorContext } from '../../components/Theme';

import { featured, latest } from '../../mock/stories';

const Stories = () => {
  const router = useRouter();
  
  const [sectionsArray, setSectionsArray] = useState(false);

  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const filtersHeaderRef = useRef(null);

  const [stories, setStories] = useState([]);
  const [filters, setFilters] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersHidden, setFiltersHidden] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const { colorTheme, setColorTheme } = useContext(ColorContext);
  
  const { height, isMobile } = useWindowSize();

  let searchTimeout;

  const [searchQuery, {data: storiesQueryResponse, loading, refetch}] =  useLazyQuery(mountSearchQuery(!!filters.name, !!filters.mainCategory, !!filters.categories));

  useEffect(() => {
    if (storiesQueryResponse) {
      console.log(storiesQueryResponse);
      setStories(storiesQueryResponse.winnibook_stories);
    }
  }, [storiesQueryResponse]);

  useEffect(() => {
    setFiltersHidden(false);
    setColorTheme(router.query.theme ? router.query.theme : 'base');

    searchQuery(
      {
        variables: {
        }
      }
    )
  }, []);

  useEffect(() => {
    setSectionsArray([...Array(Math.ceil(stories.length / 8)).keys()]);
  }, [stories]);

  const searchStories = (aFilters) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setFilters(aFilters);
      searchQuery(
        {
          variables: {
            title: "%" + aFilters.name + "%",
            mainCategoryId: aFilters.mainCategory ? aFilters.mainCategory : "9349ae64-be69-11eb-8529-0242ac130003",
            categoryIds: aFilters.categories ? aFilters.categories : [],
          }
        }
      )
    }, 500)
  }

  return (
    <div className="h-full overflow-hidden">

      <TopNav
        reference={headerRef} 
        hasBG
      />

      {
        !loading ?
        <ul
          className="
            container 
            grid 
            grid-cols-2 
            md:grid-cols-3 
            auto-rows-min 
            md:auto-rows-stories 

            gap-5 
            md:gap-8 

            scrollbar-hide 

            min-h-100vh
            max-width-100w 

            overflow-x-hidden 
            overflow-y-scroll 

            p-3 
            md:p-10
          "
        >

          {/* LATEST STORY */}
          {
            stories[0] ?
              <Link href={"/story/" + stories[0].id}>
                <div className="col-span-2 md:col-span-3 row-span-1 md:row-span-2 flex flex-col md:flex-row group cursor-pointer">
                  <div
                    className="transform transition w-full min-h-30vh md:min-h-full md:w-4/6 rounded-20p bg-image mb-3 md:mb-0 md:mr-5"
                    style={{ backgroundImage: `url(${stories[0].images[0]?.image.url})` }}
                  />
                  <div className="w-full md:w-2/6">
                    <StoryCard
                      title={stories[0].title}
                      categories={stories[0].categories.map((cat) => cat.category).concat([stories[0]?.main_category]).splice(0, 3)}
                      content={stories[0].subtitle}
                      growWithSpace
                      big
                      vertical={isMobile}
                    />
                  </div>
                </div>
              </Link>
            : ""
          }
          
          <li className="hidden md:block" />

          {sectionsArray && sectionsArray.map((index, i) => (
            <Fragment key={`story-section-${i}`}>
              {stories[index * i] && (
                <li>
                  <Link href={"/story/" + stories[index * i]}>
                    <a>
                      <StoryCard
                        image={stories[index * i].images[0]?.image.url}
                        title={stories[index * i].title}
                        categories={stories[index * i].categories.map((cat) => cat.category).concat([stories[index * i]?.main_category]).splice(0, 3)}
                        content={stories[index * i].subtitle}
                        vertical
                        growWithSpace
                        imgBigger
                      />
                    </a>
                  </Link>
                </li>
              )}
              {stories[index * i + 1] && (
                <li>
                  <Link href={"/story/" + stories[index * i + 1]}>
                    <a>
                      <StoryCard
                        vertical
                        growWithSpace
                        imgBigger
                        image={stories[index * i + 1].images[0]?.image.url}
                        title={stories[index * i + 1].title}
                        categories={stories[index * i + 1].categories.map((cat) => cat.category).concat([stories[index * i + 1]?.main_category]).splice(0, 3)}
                        content={stories[index * i + 1].subtitle}
                      />
                    </a>
                  </Link>
                </li>
              )}
              {stories[index * i + 2] && (
                <li>
                  <Link href={"/story/" + stories[index * i + 2]}>
                    <a>
                      <StoryCard
                        vertical
                        growWithSpace
                        imgBigger
                        image={stories[index * i + 2].images[0]?.image.url}
                        title={stories[index * i + 2].title}
                        categories={stories[index * i + 2].categories.map((cat) => cat.category).concat([stories[index * i + 2]?.main_category]).splice(0, 3)}
                        content={stories[index * i + 2].subtitle}
                      />
                    </a>
                  </Link>
                </li>
              )}
              {stories[index * i + 3] && (
                <li className="md:col-span-2 md:row-span-2">
                  <Link href={"/story/" + stories[index * i + 3]}>
                    <a>
                      <StoryCard
                        image={stories[index * i + 3].images[0]?.image.url}
                        title={stories[index * i + 3].title}
                        categories={stories[index * i + 3].categories.map((cat) => cat.category).concat([stories[index * i + 3]?.main_category]).splice(0, 3)}
                        content={stories[index * i + 3].subtitle}
                        growWithSpace
                        vertical
                        imgBigger
                      />
                    </a>
                  </Link>
                </li>
              )}
              <li className="hidden md:block" />
              {stories[index * i + 4] && (
                <li>
                  <Link href={"/story/" + stories[index * i + 4]}>
                    <a>
                      <StoryCard
                        vertical
                        growWithSpace
                        imgBigger
                        image={stories[index * i + 4].images[0]?.image.url}
                        title={stories[index * i + 4].title}
                        categories={stories[index * i + 4].categories.map((cat) => cat.category).concat([stories[index * i + 4]?.main_category]).splice(0, 3)}
                        content={stories[index * i + 4].subtitle}
                      />
                    </a>
                  </Link>
                </li>
              )}
              {stories[index * i + 5] && (
                <li>
                  <Link href={"/story/" + stories[index * i + 5]}>
                    <a>
                      <StoryCard
                        vertical
                        growWithSpace
                        imgBigger
                        image={stories[index * i + 5].images[0]?.image.url}
                        title={stories[index * i + 5].title}
                        categories={stories[index * i + 5].categories.map((cat) => cat.category).concat([stories[index * i + 5]?.main_category]).splice(0, 3)}
                        content={stories[index * i + 5].subtitle}
                      />
                    </a>
                  </Link>
                </li>
              )}
              <li className="hidden md:block" />
              {stories[index * i + 6] && (
                <li className="md:col-span-2 md:row-span-2">
                  <Link href={"/story/" + stories[index * i + 6]}>
                    <a>
                      <StoryCard
                        image={stories[index * i + 6].images[0]?.image.url}
                        title={stories[index * i + 6].title}
                        categories={stories[index * i + 6].categories.map((cat) => cat.category).concat([stories[index * i + 6]?.main_category]).splice(0, 3)}
                        content={stories[index * i + 6].subtitle}
                        growWithSpace
                        vertical
                        imgBigger
                      />
                    </a>
                  </Link>
                </li>
              )}
              {stories[index * i + 7] && (
                <li>
                  <Link href={"/story/" + stories[index * i + 7]}>
                    <a>
                      <StoryCard
                        vertical
                        growWithSpace
                        imgBigger
                        image={stories[index * i + 7].images[0]?.image.url}
                        title={stories[index * i + 7].title}
                        categories={stories[index * i + 7].categories.map((cat) => cat.category).concat([stories[index * i + 7]?.main_category]).splice(0, 3)}
                        content={stories[index * i + 7].subtitle}
                      />
                    </a>
                  </Link>
                </li>
              )}
              <li className="hidden md:block" />
              <li className="hidden md:block" />
            </Fragment>
          ))}

          {/* <li className="col-span-full mb-10">
            <RoundButton customClasses="mx-auto block" text="LOAD MORE STORIES" big />
          </li>
          <li className="col-span-full mb-10 row-span-1">.</li> */}
        </ul>
        : 
        <div className="w-full min-h-100vh"></div>
      }
      
      {/* STORIES FILTERS */}
      <FilterBars
        reference={filtersRef}
        headerReference={filtersHeaderRef}
        filters={activeFilters}
        onFiltersChange={searchStories}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
        hidden={filtersHidden}
        availableFilters={['categories']}
      />
    </div>
  );
};

export default Stories;
