import { useContext } from 'react';
import styled from 'styled-components';
import { truncate } from '../../utils';
import Tag from '../Tag';
import { ColorContext } from '../Theme';

const SImg = styled.div`
  ${({ img, theme, $t, noImg }) =>
    img
      ? `
      background-image: url(${img});
      background-poisiton: center;
      background-size: cover;
      background-repeat: no-repeat;

      `
      : noImg
      ? ''
      : `
      background-color: ${theme.colors[$t].bg};      
      opacity: 0.8;
      background-image:  linear-gradient(135deg, ${theme.colors[$t].bg} 25%, transparent 25%), linear-gradient(225deg, ${theme.colors[$t].bg} 25%, transparent 25%), linear-gradient(45deg, ${theme.colors[$t].bg} 25%, transparent 25%), linear-gradient(315deg, ${theme.colors[$t].bg} 25%, ${theme.colors[$t].primary} 25%);
      background-position:  10px 0, 10px 0, 0 0, 0 0;
      background-size: 20px 20px;
      background-repeat: repeat;
 `};
  & {
    position: relative;
  }

  &:hover {
    box-shadow: 4px 4px 0 ${({ theme, $t }) => theme.colors[$t].primary};
  }
`;

const StoryCard = ({
  image,
  title,
  categories,
  content,
  vertical,
  growWithSpace,
  big,
  invertColors = true,
  imgBigger,
  noImg
}) => {
  const { colorTheme } = useContext(ColorContext);

  return (
    <div
      className={`group min-w-1/2 relative md:h-full flex cursor-pointer ${
        vertical ? 'flex-col' : 'flex-row'
      }`}
    >
      <SImg
        $t={colorTheme}
        className={`relative transition rounded-xl ${
          growWithSpace ? 'flex-1 w-full min-h-32' : 'h-32 md:h-auto w-32 md:w-48'
        } ${vertical ? 'mb-3' : big ? 'mr-5' : 'mr-3'}`}
        img={image}
        noImg={noImg}
      />

      <div className={` ${imgBigger ? '' : 'flex-1 flex flex-col'}`}>
        <div>
          {categories && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <Tag
                  key={`${i}-${cat.name}`}
                  theme={cat.theme}
                  name={cat.name}
                  invertColors={invertColors}
                  small={!big}
                />
              ))}
            </div>
          )}
          <h3 className={`uppercase mb-1 md:mb-1 ${big ? 'md:text-5xl' : 'md:text-xl'}`}>
            {truncate(title, 75)}
          </h3>
        </div>
        {content && <p className="font-serif">{content}</p>}
      </div>
    </div>
  );
};

export default StoryCard;
