import { useContext } from 'react';
import styled from 'styled-components';
import { Box } from '../Containers';
import { Icon } from '../Icon';
import { ColorContext } from '../Theme/ColorProvider';

const items = ['instagram', 'twitter', 'facebook'];

const SIcon = styled(Icon)`
  margin-right: 1em;
  &:last-child {
    margin-right: 0;
  }
`;

const index = () => {
  const { colorTheme } = useContext(ColorContext);
  return (
    <Box display="flex">
      {items.map(el => (
        <SIcon
          key={el}
          active={colorTheme}
          icon={el}
          onClick={() => console.log('social network')}
        />
      ))}
    </Box>
  );
};

export default index;
