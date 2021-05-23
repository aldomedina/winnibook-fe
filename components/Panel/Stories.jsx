import styled from 'styled-components';
import { ColorContext } from '../Theme';

import SectionWrapper from './SectionWrapper';
import Tag from '../Tag';
import StoryCard from '../StoryCard';

import { stories as s } from '../../mock/home';

const BigStoryCard = styled.div`

  &:hover .story-image {
    box-shadow: 4px 4px 0 ${({ theme, $t }) => theme.colors[$t].primary};
  }
`;

const Stories = ({ reference }) => {
  const { featured, latest } = s;

  return (
    <SectionWrapper reference={reference} i={2} customClasses="w-90vw pt-16 md:pt-20">
      <div className="flex flex-col gap-4 md:flex-row h-full w-full overflow-y-scroll md:overflow-y-visible">

        <BigStoryCard 
          className="big-story-card group w-full min-h-50vh md:h-auto md:w-7/12 flex flex-col gap-2 md:gap-5 cursor-pointer md:mr-5"
          $t={featured.theme}
        >
          <div
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
            style={{ backgroundImage: `url(${featured.img})` }}
          />
          <div>
            <h3 className="h-max text-2xl md:text-4xl uppercase mb-1 md:mb-5">{featured.title}</h3>
            <div className="w-max grid gap-4 grid-flow-col auto-cols-auto mb-5">
              {featured.categories.map((cat, i) => (
                <Tag key={`${i}-${cat.name}`} theme={cat.theme} name={cat.name} />
              ))}
            </div>
            <p className="font-serif hidden md:block">{featured.body}</p>
          </div>
        </BigStoryCard>

        <div className="w-full md:w-5/12 flex flex-col gap-4 md:gap-5">
          {latest.map((s, i) => (
            <div key={`${i}-${s.title}`} className="flex-1 ">
              <StoryCard title={s.title} image={s.img} categories={s.categories} />
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Stories;
