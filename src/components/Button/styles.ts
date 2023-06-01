import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

// export const Button = styled.TouchableOpacity`
//   ${({ theme }) => css`
//     padding: ${RFValue(theme.spacings.xsmall)}px;
//     width: 100%;
//     align-items: center;
//     justify-content: center;
//     background-color: ${theme.colors.primary};
//     border-radius: 4px;
//   `}
// `

export const Button = styled.TouchableOpacity<{ small?: boolean }>`
  ${({ theme, small }) => css`
    padding: ${RFValue(theme.spacings.xsmall)}px;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.primary};
    border-radius: 4px;
    ${small &&
    css`
      width: 60%;
      padding: ${RFValue(theme.spacings.xxsmall)}px;
    `}
  `}
`

export const Text = styled.Text<{ small?: boolean }>`
  ${({ theme, small }) => css`
    color: ${theme.colors.mainBg};
    font-size: ${RFValue(theme.font.sizes.medium)}px;
    font-weight: ${theme.font.bold};

    ${small &&
    css`
      font-size: ${RFValue(theme.font.sizes.small)}px;
    `}
  `}
`
