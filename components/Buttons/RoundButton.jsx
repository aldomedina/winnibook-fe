import styled from 'styled-components';

const SButton = styled.button`
  border-color: ${({ $color }) => $color};
`;

const RoundButton = ({ text, big, onClick, strokeColor, customClasses }) => {
  return (
    <SButton
      onClick={onClick}
      $color={strokeColor}
      className={`rounded-full border transition-all hover:border-8 ${
        big ? 'w-52 h-52 border-2 text-2xl' : 'w-20 h-20 text-xl'
      } ${customClasses}`}
    >
      {text}
    </SButton>
  );
};

export default RoundButton;
