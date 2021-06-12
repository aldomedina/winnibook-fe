import { useContext, useEffect } from 'react';
import PlaceDetailsPanel from '../../components/PlaceDetailsPanel';
import PlaceRowHeader from '../../components/PlaceRow/PlaceRowHeader';
import { ColorContext } from '../../components/Theme';
import getPlaceDetails from '../../mock/place';

const Place = ({ placeData }) => {
  const { setColorTheme } = useContext(ColorContext);
  useEffect(() => {
    placeData?.theme && setColorTheme(placeData.theme);
  }, []);
  return (
    <div className="pt-14 h-full overflow-y-hidden">
      <div className="py-2">
        <PlaceRowHeader
          isOpen={false}
          name={placeData.name}
          location={placeData.neighbor}
          isSingle
        />
      </div>
      <div className="w-full h-full">
        <PlaceDetailsPanel data={placeData} />
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const placeData = getPlaceDetails(slug);
  return {
    props: {
      placeData
    }
  };
}

export default Place;
