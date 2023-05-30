import styled, { css } from 'styled-components/native'

export const Button = styled.TouchableOpacity`
  ${({ theme }) => css`
    height: 40px;
    width: 100%;
    background-color: ${theme.colors.mainBg};
  `}
`
