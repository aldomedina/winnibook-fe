import styled from 'styled-components';

export const Icon = styled.div`
  display: inline-block;
  width: ${props => (props.w ? props.w : '20px')};
  height: ${props => (props.h ? props.h : '20px')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: ${({ active, theme }) =>
    active ? theme.colors[active].primary : theme.colors.base.primary};
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  ${props => `mask-image: url("/icons/${props.icon}.svg")`};
`;
