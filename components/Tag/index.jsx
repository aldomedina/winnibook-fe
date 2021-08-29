import styled from 'styled-components';
import { Icon } from '../Icon';

const STag = styled.div`
  background-color: ${({ theme, $t, $invert, $isFilterTag }) =>
    $isFilterTag ? 'transparent' : $invert ? theme.colors[$t]?.bg : theme.colors[$t]?.primary};
  color: ${({ theme, $t, $invert, $isFilterTag }) =>
    $isFilterTag ? 'inherit' : $invert ? theme.colors[$t]?.primary : theme.colors[$t]?.bg};
`;

const Tag = ({
  theme,
  name,
  big,
  onTagClick,
  invertColors,
  handleRemoveClick,
  tagInfo,
  filterTag,
  small
}) => {
  return (
    <STag
      onClick={() => onTagClick && onTagClick(tagInfo)}
      $t={theme}
      $isFilterTag={filterTag}
      $invert={invertColors}
      className={`tag ${
        big ? 'text-md lg:text-lg' : small ? 'text-3xs md:text-2xs' : 'text-3xs lg:text-2xs '
      } ${onTagClick ? 'cursor-pointer hover-interaction' : ''} ${
        filterTag ? 'border border-1 flex items-center 	' : ''
      }`}
    >
      <span className="align-center whitespace-nowrap">{name}</span>
      {handleRemoveClick && (
        <div
          className="ml-2 mt-0.5 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            handleRemoveClick(tagInfo);
          }}
        >
          <Icon icon="x" w="16px" h="16px" />
        </div>
      )}
    </STag>
  );
};

export default Tag;
