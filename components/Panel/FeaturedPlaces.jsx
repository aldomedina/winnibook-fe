import { useRouter } from 'next/router';

import PlaceCard from '../PlaceCard';
import Loader from '../Loader';
import SectionWrapper from './SectionWrapper';

const FeaturedPlaces = ({ reference, list, isLoading }) => {
  return (
    <SectionWrapper
      i={1}
      reference={reference}
      sectionThreshold={0.8}
      customClasses="w-screen md:max-w-70vw rounded-bl-20p md:rounded-bl-50p pt-16 md:pt-40 flex flex-col"
      title={list?.text}
    >
      {isLoading ? (
        <Loader theme="base" />
      ) : (
        <div className="h-full grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-none md:auto-rows-auto-dense gap-2 md:gap-5 ">
          {list?.locals.map(p => (
            <a href={'place/' + p.localByLocal.id} key={p.localByLocal.id}>
              <PlaceCard
                name={p.localByLocal.name}
                categories={p.localByLocal.categories
                  .map(cat => cat.category)
                  .concat([p.localByLocal?.main_category])
                  .splice(0, 3)}
                theme={p.localByLocal.main_category.theme}
              />
            </a>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};

export default FeaturedPlaces;
