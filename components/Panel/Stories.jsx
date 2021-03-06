import { useContext } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { ColorContext } from '../Theme';

import SectionWrapper from './SectionWrapper';
import Tag from '../Tag';
import Loader from '../Loader';
import StoryCard from '../StoryCard';

const BigStoryCard = styled.div`
  &:hover .story-image {
    box-shadow: 4px 4px 0 ${({ theme, $t }) => theme.colors[$t]?.primary};
  }
`;

const BigStoryCardImage = styled.div`
  ${({ img, theme, $t }) =>
    img
      ? `
      background-image: url(${img});
      background-poisiton: center;
      background-size: cover;
      background-repeat: no-repeat;

      `
      : `
      background-color: ${theme.colors[$t].bg};      
      opacity: 0.8;
      background-image:  linear-gradient(135deg, ${theme.colors[$t].bg} 25%, transparent 25%), linear-gradient(225deg, ${theme.colors[$t].bg} 25%, transparent 25%), linear-gradient(45deg, ${theme.colors[$t].bg} 25%, transparent 25%), linear-gradient(315deg, ${theme.colors[$t].bg} 25%, ${theme.colors[$t].primary} 25%);
      background-position:  10px 0, 10px 0, 0 0, 0 0;
      background-size: 20px 20px;
      background-repeat: repeat;
    `};
  & {
    position: relative;
  }

  &:hover {
    box-shadow: 4px 4px 0 ${({ theme, $t }) => theme.colors[$t].primary};
  }
`;

const Stories = ({ reference, stories, isLoading }) => {
  const { colorTheme } = useContext(ColorContext);

  return (
    <SectionWrapper reference={reference} i={2} customClasses="w-90vw pt-16 md:pt-20">
      {isLoading ? (
        <Loader theme="base" />
      ) : (
        <div className="flex flex-col gap-4 md:flex-row h-full w-full overflow-y-scroll md:overflow-y-visible">
          <Link href={'/story/' + stories[0]?.id}>
            <BigStoryCard
              className="big-story-card group w-full min-h-50vh md:h-auto md:w-7/12 flex flex-col gap-2 md:gap-5 cursor-pointer md:mr-5"
              $t={stories[0]?.theme}
            >
              <BigStoryCardImage
                className="
                story-image
                transition 
                max-h-45vh 
                flex-1 
                md:flex-auto 
                h-30vh 
                md:h-3/6 
                w-full 
                rounded-20p 
                bg-image
              "
                $t={colorTheme}
                img={stories[0]?.images[0]?.image.url}
                // style={{ backgroundImage: `url(${stories[0]?.images[0]?.image.url})` }}
              />
              <div>
                <h3 className="h-max text-2xl md:text-4xl uppercase mb-1 md:mb-5">
                  {stories[0]?.title}
                </h3>
                <div className="w-max grid gap-4 grid-flow-col auto-cols-auto mb-5">
                  {/* {stories[0]?.categories.map((cat, i) => (
                  <Tag key={`${i}-${cat.name}`} theme={cat.theme} name={cat.name} />
                ))} */}
                  <Tag
                    theme={stories[0]?.main_category.theme}
                    name={stories[0]?.main_category.name}
                  />
                </div>
                <p className="font-serif md:block">{stories[0]?.subtitle}</p>
              </div>
            </BigStoryCard>
          </Link>

          <div className="w-full md:w-5/12 flex flex-col gap-4 md:gap-5">
            {stories
              .filter((el, i, ar) => i > 0)
              .map((s, i) => (
                <Link href={'/story/' + s.id}>
                  <div key={`${i}-${s.title}`} className="flex-1 ">
                    <StoryCard
                      title={s.title}
                      image={s.images[0]?.image.url}
                      categories={[s.main_category]}
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Stories;
