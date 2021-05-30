import PlaceCard from '../PlaceCard';
import SectionWrapper from './SectionWrapper';

const Places = ({ reference, places }) => {
  if (!places) {
    return "";
  }

  console.log(places)

  return (
    <SectionWrapper
      i={3}
      reference={reference}
      customClasses="w-100vw md:w-80vw flex flex-col pt-14 md:pt-40 "
      title="TOP SEARCH THIS WEEK"
    >

      <div className="flex md:flex-row gap-3 md:gap-5 flex-col h-full w-full overflow-y-scroll md:overflow-y-visible">
        <div className="group w-full md:w-3/6  md:h-full min-h-40vh">
          <PlaceCard name={places[0]?.name} theme={places[0]?.main_category.theme} categories={[places[0]?.main_category]} extraBig />
        </div>
        <div className="group w-full md:w-3/6 min-h-50vh md:min-h-0 md:h-full grid grid-cols-2 grid-rows-2 gap-3 md:gap-5">
          {places.filter((el, i, ar) => i > 0).map(el => (
            <PlaceCard key={el.id} name={el.name} theme={el.main_category.theme} categories={[el.main_category]} big={true} />
          ))}
        </div>
      </div>

    </SectionWrapper>
  );
};

export default Places;
