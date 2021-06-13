import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import Tag from '../Tag';
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const SPlaceCard = styled.div`
  color: ${({ theme, $t }) => theme.colors[$t].primary};
  background-color: ${({ theme, $t }) => theme.colors[$t].bg};

  &:hover {
    box-shadow: 4px 4px 0 ${({ theme, $t }) => theme.colors[$t].primary};
  }
`;

const PlaceCard = ({ name, theme, onClick, categories, big, extraBig }) => {
  return (
    <SPlaceCard
      $t={theme}
      className={`
        w-full 
        h-full 
        text-sm 
        md:text-md 
        rounded-lg 
        md:rounded-20p 
        flex 
        flex-col 
        justify-between 
        cursor-pointer
        transition
        ${big || extraBig ? 'py-2 px-4 md:p-6' : 'p-2 md:p-3'}
      `}
      onClick={onClick}
    >
      <h3
        className={`
          uppercase 
          ${
            big
              ? 'md:text-3xl text-xl leading-normal leading-6 '
              : extraBig
              ? 'md:text-6xl text-3xl leading-normal'
              : 'text-md md:text-xl leading-5 '
          }
        `}
      >
        <ResponsiveEllipsis
          text={name}
          maxLine={big || extraBig ? '3' : '4'}
          ellipsis="..."
          basedOn="letters"
          trimRight
        />
      </h3>
      <div className="categories flex flex-col">
        {categories.map(cat => (
          <Tag theme={cat.theme} name={cat.name} />
        ))}
      </div>
    </SPlaceCard>
  );
};

export default PlaceCard;
