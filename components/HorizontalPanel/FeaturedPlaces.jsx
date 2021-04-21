import { featuresBusiness } from '../../mock/home';
import PlaceCard from '../PlaceCard';
import SectionWrapper from './SectionWrapper';

const FeaturedPlaces = ({ reference }) => {
  return (
    <SectionWrapper
      i={1}
      reference={reference}
      sectionThreshold={0.8}
      customClasses="w-screen md:w-70vw rounded-bl-20p md:rounded-bl-50p pt-12 md:pt-40 flex flex-col"
      title="WINNIPEG’S AWESOME local BUSINESS"
    >
      <div className="h-full max-h-full grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-2 md:gap-5">
        {featuresBusiness.map(p => (
          <PlaceCard
            key={p.id}
            name={p.name}
            secondaryCategory={p.secondaryCategory}
            primaryColor={p.primaryColor}
            secondaryColor={p.secondaryColor}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeaturedPlaces;
