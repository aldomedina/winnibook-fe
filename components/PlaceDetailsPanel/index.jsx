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
        address={address}
      />
      {/* <PlaceMap location={location} theme={theme} />
      <SimilarStories stories={stories} /> */}
      {/* <SimilarPlaces similar={similar} /> */}
    </HorizontalScroll>
  );
};

export default PlaceDetailsPanel;
