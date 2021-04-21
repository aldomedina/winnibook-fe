import styled from 'styled-components';
import Tag from '../Tag';

const SPlaceCard = styled.div`
  color: ${({ $color }) => $color};
  background-color: ${({ $bgcolor }) => $bgcolor};
`;

const PlaceCard = ({ name, primaryColor, secondaryColor, onClick, secondaryCategory, big }) => {
  return (
    <SPlaceCard
      $color={primaryColor}
      $bgcolor={secondaryColor}
      className={`w-full h-full  text-sm md:text-md rounded-lg md:rounded-20p flex flex-col justify-between cursor-pointer transform transition hover:shadow-lg hover:-translate-y-1 ${
        big ? 'p-4 md:p-6' : 'p-2 md:p-3'
      }`}
      onClick={onClick}
    >
      <h3 className={`uppercase ${big ? 'md:text-6xl text-3xl' : 'text-md md:text-2xl'}`}>
        {name}
      </h3>
      <Tag
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        secondaryCategory={secondaryCategory}
        big={big}
      />
    </SPlaceCard>
  );
};

export default PlaceCard;
