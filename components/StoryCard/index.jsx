import { useContext } from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import { ColorContext } from '../Theme';

const SImg = styled.div`
  & {
    position: relative;
  }
  ${({ $t, theme }) =>
    $t !== 'base' &&
    `  
    filter:  contrast(120%);
    
    `}
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ $t, theme }) => theme.colors[$t].bg};
    border-radius: 0.75rem;
    ${({ $t, theme }) => $t !== 'base' && "content: '';"};
    transition: opacity 0.15s ease;
    opacity: 0.5;
  }
  &:hover {
    &::after {
      opacity: 0;
    }
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
      className={`group relative md:h-full flex cursor-pointer ${
        vertical ? 'flex-col' : 'flex-row'
      }`}
    >
      {image && (
        <SImg
          $t={colorTheme}
          className={`relative transform transition group-hover:shadow-lg group-hover:-translate-y-0.5  bg-image rounded-xl ${
            growWithSpace ? 'flex-1 w-full min-h-32' : 'h-32 md:h-auto w-32 md:w-48'
          } ${vertical ? 'mb-3' : big ? 'mr-5' : 'mr-3'}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className={` ${imgBigger ? '' : 'flex-1 flex flex-col justify-between'}`}>
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
