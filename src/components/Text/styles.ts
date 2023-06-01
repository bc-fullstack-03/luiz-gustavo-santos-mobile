import styled, { DefaultTheme, css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Props } from '.'

const textModifier = {
  xsmall: (theme: DefaultTheme) => css`
    font-size: ${RFValue(theme.font.sizes.xsmall)}px;
  `,
  small: (theme: DefaultTheme) => css`
    font-size: ${RFValue(theme.font.sizes.small)}px;
  `,
  medium: (theme: DefaultTheme) => css`
    font-size: ${RFValue(theme.font.sizes.medium)}px;
  `,
  large: (theme: DefaultTheme) => css`
    font-size: ${RFValue(theme.font.sizes.large)}px;
  `,
  xlarge: (theme: DefaultTheme) => css`
    font-size: ${RFValue(theme.font.sizes.xlarge)}px;
  `,
  xxlarge: (theme: DefaultTheme) => css`
    font-size: ${RFValue(theme.font.sizes.xxlarge)}px;
  `
}

export const TextStyled = styled.Text<Pick<Props, 'size' | 'color' | 'bold'>>`
  ${({ theme, size, color, bold }) => css`
    color: ${color || theme.colors.gray100};
    font-weight: ${bold ? theme.font.bold : theme.font.normal};
    ${!!size && textModifier[size](theme)};
  `}
`
