import styled from 'styled-components';

const StepItemWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 16px;

  &:before {
    content: '';
    position: absolute;
    transition: all 0.15s ease-in;
    background-color: ${({ theme, $t }) => theme.colors[$t].primary};
    opacity: 0.3;
    width: 100%;
    height: 2px;
    top: 34px;
    left: calc(50% + 20px);
  }

  &:after {
    content: '';
    position: absolute;
    transition: all 0.15s ease-in;
    background-color: ${({ theme, $t }) => theme.colors[$t].primary};
    width: ${({ type, theme }) => (type === 'done' ? '100%' : '0%')};
    height: 2px;
    top: 34px;
    left: calc(50% + 20px);
  }

  .number-step {
    position: relative;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 0.8rem;
    transition: all 0.15s ease-in;
    color: ${({ type, theme, $t }) => (type ? theme.colors[$t].bg : theme.colors[$t].primary)};
    border: 2px solid
      ${({ type, theme, $t }) => (type ? theme.colors[$t].bg : theme.colors[$t].primary + '4D')};
    border-radius: 100%;
    background-color: ${({ type, theme, $t }) =>
      type ? theme.colors[$t].primary : theme.colors[$t].bg};
    transition: all 0.5 ease;
    z-index: 2;
    display: block;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      opacity: ${({ type }) => (type ? 1 : 0.3)};
    }
  }

  .label-step {
    display: none;
  }
  &:last-child {
    &:after,
    &:before {
      display: none;
    }
  }
  @media (min-width: 768px) {
    text-align: center;
    width: ${({ width }) => `calc(${width}% - 32px);`};

    &:before {
      content: '';
      width: 100%;
      height: 2px;
      top: 34px;
      left: unset;
    }

    &:after {
      content: '';
      width: ${({ type, theme }) => (type === 'done' ? '100%' : '0%')};
      height: 2px;
      top: 34px;
      left: calc(50% + 20px);
    }

    .number-step {
      display: block;
      margin: 0 auto;
      padding-top: 8px;
    }

    .label-step {
      display: block;
      margin-top: 10px;
      opacity: ${({ type }) => (type ? 1 : 0.3)};
    }
  }
`;

export default StepItemWrapper;
