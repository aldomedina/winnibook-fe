import { useContext } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { ColorContext } from '../Theme';

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
    <div className="flex items-center">
      {items.map(el => (
        <SIcon
          key={el}
          active={colorTheme}
          icon={el}
          onClick={() => console.log('social network')}
        />
      ))}
    </div>
  );
};

export default index;
