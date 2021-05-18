import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import GeneralDetails from './GeneralDetails';
import PlaceMap from './PlaceMap';
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
    stories,
    location,
    theme
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
      <PlaceMap location={location} theme={theme} />
      <SimilarStories stories={stories} />
      <SimilarPlaces similar={similar} />
    </HorizontalScroll>
  );
};

export default PlaceDetailsPanel;
