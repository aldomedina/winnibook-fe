import styled from 'styled-components';

const SButton = styled.button`
  background-color: ${({ theme, $t, $invert, $isFilterTag }) =>
    $invert ? theme.colors[$t]?.bg : theme.colors[$t]?.primary};
  color: ${({ theme, $t, $invert, $isFilterTag }) =>
    $invert ? theme.colors[$t]?.primary : theme.colors[$t]?.bg};
`;

const Button = ({ theme, title, onClick, invertColors }) => {

  return (
    <SButton 
      $t={theme}
      $invert={invertColors}
      className="
        py-2
        px-2

        border
        rounded-xl
      "
      onClick={onClick}
    >
      {title}
    </SButton>
  );
};

export default Button;
