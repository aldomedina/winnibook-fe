import { useRouter } from 'next/router';

import PlaceCard from '../PlaceCard';
import SectionWrapper from './SectionWrapper';

import { featuresBusiness } from '../../mock/home';

const FeaturedPlaces = ({ reference }) => {
  return (
    <SectionWrapper
      i={1}
      reference={reference}
      sectionThreshold={0.8}
      customClasses="w-screen md:w-70vw rounded-bl-20p md:rounded-bl-50p pt-14 md:pt-40 flex flex-col"
      title="WINNIPEG’S AWESOME local BUSINESS"
    >
      <div className="h-full grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-none md:auto-rows-auto-dense gap-2 md:gap-5 ">
        {featuresBusiness.map(p => (
          <a 
            href={"place/" + p.id}
            key={p.id} 
          >
            <PlaceCard 
              name={p.name} 
              categories={p.categories} 
              theme={p.theme} 
              big={true}
            />
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeaturedPlaces;
