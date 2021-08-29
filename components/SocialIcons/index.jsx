import { useContext } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { ColorContext } from '../Theme';

const items = [
  { icon: 'instagram', url: 'https://www.instagram.com/winnibookbiz' },
  // { icon: 'twitter', url: 'https://www.twitter.com/winnibookbiz' },
  { icon: 'facebook', url: 'https://www.facebook.com/winnibookbiz' }
];

const SIcon = styled(Icon)`
  margin-right: 1em;
  &:last-child {
    margin-right: 0;
  }
`;

const SocialIcons = () => {
  const { colorTheme } = useContext(ColorContext);
  return (
    <div className="flex items-center cursor-pointer">
      {items.map(el => (
        <SIcon
          key={el.icon}
          active={colorTheme}
          icon={el.icon}
          onClick={() => window.open(el.url, '_blank')}
        />
      ))}
    </div>
  );
};

export default SocialIcons;
