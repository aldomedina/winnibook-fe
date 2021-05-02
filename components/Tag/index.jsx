import styled from 'styled-components';
import { Icon } from '../Icon';
const STag = styled.div`
  background-color: ${({ theme, $t, $invert, $isFilterTag }) =>
    $isFilterTag ? 'transparent' : $invert ? theme.colors[$t].bg : theme.colors[$t].primary};
  color: ${({ theme, $t, $invert, $isFilterTag }) =>
    $isFilterTag ? 'inherit' : $invert ? theme.colors[$t].primary : theme.colors[$t].bg};
`;

const Tag = ({
  theme,
  name,
  big,
  onTagCLick,
  invertColors,
  handleRemoveClick,
  cat,
  filterTag,
  size
}) => {
  return (
    <STag
      onClick={() => onTagCLick && onTagCLick(cat)}
      $t={theme}
      $isFilterTag={filterTag}
      $invert={invertColors}
      className={`tag ${big ? 'text-xs md:text-md lg:text-lg' : 'text-xxs lg:text-xs '} ${
        onTagCLick ? 'cursor-pointer' : ''
      } ${filterTag ? 'border border-1 flex items-center 	' : ''}`}
    >
      <span className="align-center whitespace-nowrap">{name}</span>
      {handleRemoveClick && (
        <div
          className="ml-2 mt-0.5 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            handleRemoveClick(cat);
          }}
        >
          <Icon icon="x" w="16px" h="16px" />
        </div>
      )}
    </STag>
  );
};

export default Tag;
