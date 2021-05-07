import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import Tag from '../Tag';
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const SPlaceCard = styled.div`
  color: ${({ theme, $t }) => theme.colors[$t].primary};
  background-color: ${({ theme, $t }) => theme.colors[$t].bg};
`;

const PlaceCard = ({ name, theme, onClick, categories, big }) => {
  return (
    <SPlaceCard
      $t={theme}
      className={`w-full h-full text-sm md:text-md rounded-lg md:rounded-20p flex flex-col justify-between cursor-pointer transform transition hover:shadow-lg hover:-translate-y-1  ${
        big ? 'p-4 md:p-6' : 'p-2 md:p-3'
      }`}
      onClick={onClick}
    >
      <h3
        className={`uppercase ${
          big ? 'md:text-4xl lg:text-6xl text-3xl' : 'text-md md:text-xl leading-5'
        }`}
      >
        <ResponsiveEllipsis
          text={name}
          maxLine={big ? '3' : '2'}
          ellipsis="..."
          basedOn="letters"
          trimRight
        />
      </h3>
      {categories && <Tag theme={theme} name={categories[0].name} big={big} />}
    </SPlaceCard>
  );
};

export default PlaceCard;
