import { useState, useRef, Fragment } from 'react';
import FilterBars from '../../components/FiltersBar';
import StoryCard from '../../components/StoryCard';
import useWindowSize from '../../components/Hooks/useWindowSize';
import styled from 'styled-components';
import { featured, latest } from '../../mock/stories';
import { useEffect } from 'react';
import RoundButton from '../../components/Buttons/RoundButton';

const Stories = () => {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sectionsArray, setSectionsArray] = useState([]);
  const listRef = useRef(null);
  const filtersRef = useRef(null);
  const filtersHeaderRef = useRef(null);
  const { height, isMobile } = useWindowSize();

  useEffect(() => {
    setSectionsArray([...Array(Math.ceil(latest.length / 8)).keys()]);
  }, [latest]);

  return (
    <div className="h-full overflow-hidden">
      <ul
        className="container grid grid-cols-2 md:grid-cols-3 auto-rows-min md:auto-rows-stories gap-5 md:gap-8 scrollbar-hide max-width-100w overflow-x-hidden overflow-y-scroll p-3 md:p-10"
        style={{
          marginTop: `${isMobile ? 60 : 56}px`,
          height: height - 52
        }}
      >
        <div className="col-span-2 md:col-span-3 row-span-1 md:row-span-2 flex flex-col md:flex-row group">
          <div
            className="transform transition group-hover:shadow-lg group-hover:-translate-y-0.5 w-full min-h-30vh md:min-h-full md:w-4/6 rounded-20p bg-image mb-3 md:mb-0 md:mr-5"
            style={{ backgroundImage: `url(${featured.img})` }}
          />
          <div className="w-full md:w-2/6">
            <StoryCard
              title={featured.title}
              categories={featured.categories}
              content={featured.content}
              growWithSpace
              big
              vertical={isMobile}
            />
          </div>
        </div>
        <li className="hidden md:block" />
        {sectionsArray.map((index, i) => (
          <Fragment key={`story-section-${i}`}>
            <li>
              <StoryCard
                image={latest[index * i].img}
                title={latest[index * i].title}
                categories={latest[index * i].categories}
                content={latest[index * i].content}
                vertical
                growWithSpace
                imgBigger
              />
            </li>
            {latest[index * i + 1].title && (
              <li>
                <StoryCard
                  vertical
                  growWithSpace
                  imgBigger
                  image={latest[index * i + 1].img}
                  title={latest[index * i + 1].title}
                  categories={latest[index * i + 1].categories}
                  content={latest[index * i + 1].content}
                />
              </li>
            )}
            {latest[index * i + 2].title && (
              <li>
                <StoryCard
                  vertical
                  growWithSpace
                  imgBigger
                  image={latest[index * i + 2].img}
                  title={latest[index * i + 2].title}
                  categories={latest[index * i + 2].categories}
                  content={latest[index * i + 2].content}
                />
              </li>
            )}
            {latest[index * i + 3].title && (
              <li className="md:col-span-2 md:row-span-2">
                <StoryCard
                  image={latest[index * i + 3].img}
                  title={latest[index * i + 3].title}
                  categories={latest[index * i + 3].categories}
                  content={latest[index * i + 3].content}
                  growWithSpace
                  vertical
                  imgBigger
                />
              </li>
            )}
            <li className="hidden md:block" />
            {latest[index * i + 4].title && (
              <li>
                <StoryCard
                  vertical
                  growWithSpace
                  imgBigger
                  image={latest[index * i + 4].img}
                  title={latest[index * i + 4].title}
                  categories={latest[index * i + 4].categories}
                  content={latest[index * i + 4].content}
                />
              </li>
            )}
            {latest[index * i + 5].title && (
              <li>
                <StoryCard
                  vertical
                  growWithSpace
                  imgBigger
                  image={latest[index * i + 5].img}
                  title={latest[index * i + 5].title}
                  categories={latest[index * i + 5].categories}
                  content={latest[index * i + 5].content}
                />
              </li>
            )}
            <li className="hidden md:block" />
            {latest[index * i + 6].title && (
              <li className="md:col-span-2 md:row-span-2">
                <StoryCard
                  image={latest[index * i + 6].img}
                  title={latest[index * i + 6].title}
                  categories={latest[index * i + 6].categories}
                  content={latest[index * i + 6].content}
                  growWithSpace
                  vertical
                  imgBigger
                />
              </li>
            )}
            {latest[index * i + 7].title && (
              <li>
                <StoryCard
                  vertical
                  growWithSpace
                  imgBigger
                  image={latest[index * i + 7].img}
                  title={latest[index * i + 7].title}
                  categories={latest[index * i + 7].categories}
                  content={latest[index * i + 7].content}
                />
              </li>
            )}
            <li className="hidden md:block" />
            <li className="hidden md:block" />
          </Fragment>
        ))}
        <li className="col-span-full mb-10">
          <RoundButton customClasses="mx-auto block" text="LOAD MORE STORIES" big />
        </li>
        <li className="col-span-full mb-10 row-span-1">.</li>
      </ul>
      <FilterBars
        reference={filtersRef}
        headerReference={filtersHeaderRef}
        filters={activeFilters}
        setFilters={setActiveFilters}
        open={filtersOpen}
        setOpen={setFiltersOpen}
      />
    </div>
  );
};

export default Stories;
