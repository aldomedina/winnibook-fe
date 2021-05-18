import PlaceCard from '../PlaceCard';
import SectionWrapper from './SectionWrapper';
import { topSearch } from '../../mock/home';
const Places = ({ reference }) => {
  const { top, others } = topSearch;
  return (
    <SectionWrapper
      i={3}
      reference={reference}
      customClasses="w-100vw md:w-80vw flex flex-col pt-14 md:pt-40 "
      title="TOP SEARCH THIS WEEK"
    >
      <div className="flex md:flex-row gap-3 md:gap-5 flex-col h-full w-full overflow-y-scroll md:overflow-y-visible">
        <div className="group w-full md:w-3/6  md:h-full min-h-40vh">
          <PlaceCard name={top.name} theme={top.theme} categories={top.categories} big />
        </div>
        <div className="group w-full md:w-3/6 min-h-50vh md:min-h-0 md:h-full grid grid-cols-2 grid-rows-2 gap-3 md:gap-5">
          {others.map(el => (
            <PlaceCard key={el.id} name={el.name} theme={el.theme} categories={el.categories} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Places;
