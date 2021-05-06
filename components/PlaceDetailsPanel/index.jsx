import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import GeneralDetails from './GeneralDetails';
import SimilarPlaces from './SimilarPlaces';
import SimilarStories from './SimilarStories';

const PlaceDetailsPanel = ({ data }) => {
  const {
    categories,
    tags,
    description,
    streetLine1,
    streetLine2,
    neighbor,
    country,
    postcode,
    similar,
    stories
  } = data;

  return (
    <HorizontalScroll reverseScroll>
      <GeneralDetails
        categories={categories}
        tags={tags}
        description={description}
        streetLine1={streetLine1}
        streetLine2={streetLine2}
        neighbor={neighbor}
        country={country}
        postcode={postcode}
      />
      <div className="min-w-80vw md:min-w-30vw bg-yellow-100 px-3 md:px-5"></div>
      <SimilarStories stories={stories} />
      <SimilarPlaces similar={similar} />
    </HorizontalScroll>
  );
};

export default PlaceDetailsPanel;
