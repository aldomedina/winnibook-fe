import styled from 'styled-components';
import { useContext } from 'react';
import { percentageToAlpha } from '../../utils';
const addAlpha = (themeColor, alpha) => {
  const hex = themeColor.split('#');
  return `#${percentageToAlpha[alpha].alpha}${hex[1]}`;
};
const Spinner = styled.span`
  border-color: ${({ theme, $t }) => addAlpha(theme.colors[$t].primary, '30%')};
  border-top-color: ${({ theme, $t }) => theme.colors[$t].primary};
`;
const Loader = ({ theme }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner
        $t={theme}
        className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"
      />
    </div>
  );
};

export default Loader;
