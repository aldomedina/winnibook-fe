import styled from 'styled-components';
const STag = styled.div`
  color: ${({ $color }) => $color};
  background-color: ${({ $bgcolor }) => $bgcolor};
`;
const Tag = ({ primaryColor, secondaryColor, secondaryCategory, big }) => {
  return (
    <STag
      $color={secondaryColor}
      $bgcolor={primaryColor}
      className={`w-max py-0.5 md:py-1 px-2 md:px-3 rounded-full self-end uppercase font-medium md:mr-2 md:mb-2 ${
        big ? 'md:text-lg' : 'text-xxs md:text-xs '
      }`}
    >
      <span>{secondaryCategory}</span>
    </STag>
  );
};

export default Tag;
