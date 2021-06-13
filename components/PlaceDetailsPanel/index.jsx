import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import GeneralDetails from './GeneralDetails';
import PlaceMap from './PlaceMap';
import SimilarPlaces from './SimilarPlaces';
import SimilarStories from './SimilarStories';

const PlaceDetailsPanel = ({ data }) => {
  const {
    categories=[],
    tags,
    description,
    address,
    links,
    contacts,
    main_category,
    stories,
    theme
  } = data;

  return (
    <HorizontalScroll reverseScroll>
      <GeneralDetails
        categories={categories.concat([{category: main_category}])}
        tags={tags}
        description={description}
        address={address}
        links={links}
        contacts={contacts}
      />
      <PlaceMap location={address} theme={main_category?.theme} />
      
      {
        stories.length ? <SimilarStories stories={stories} /> : ""
      }

      {
        main_category.locals_as_main_category.length ? <SimilarPlaces similar={main_category.locals_as_main_category} main_category={main_category.id}/> : ""
      }
    </HorizontalScroll>
  );
};

export default PlaceDetailsPanel;
