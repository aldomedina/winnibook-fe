import styled from 'styled-components';
const common = (color, notUpper, textCenter) => `
  color: ${color ?? 'inherit'};
  ${!notUpper && 'text-transform: uppercase;'}
  ${textCenter && 'text-align: center;'}
`;

export const H1 = styled.h1`
  font-size: ${({ fs, theme }) => fs ?? theme.fontSize.xl};
  ${({ color, notUpper, textCenter }) => common(color, notUpper, textCenter)}
`;

export const H2 = styled.h2`
  font-size: ${({ fs, theme }) => fs ?? theme.fontSize.lg};
  ${({ color, notUpper, textCenter }) => common(color, notUpper, textCenter)}
`;

export const H3 = styled.h3`
  font-size: ${({ fs, theme }) => fs ?? theme.fontSize.md};
  ${({ color, notUpper, textCenter }) => common(color, notUpper, textCenter)}
`;
