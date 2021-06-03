import { useContext } from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import { ColorContext } from '../Theme';

const SImg = styled.div`
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
  imgBigger
}) => {
  
  const { colorTheme } = useContext(ColorContext);

  return (
    <div
      className={`group min-w-1/2 relative md:h-full flex cursor-pointer ${
        vertical ? 'flex-col' : 'flex-row'
      }`}
    >
      {image && (
        <SImg
          $t={colorTheme}
          className={`relative transition bg-image rounded-xl ${
            growWithSpace ? 'flex-1 w-full min-h-32' : 'h-32 md:h-auto w-32 md:w-48'
          } ${vertical ? 'mb-3' : big ? 'mr-5' : 'mr-3'}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
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
            {title}
          </h3>
        </div>
        {content && <p className="font-serif">{content}</p>}
      </div>
    </div>
  );
};

export default StoryCard;
