import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Wrapper = styled.TextInput`
  ${({ theme }) => css`
    background: ${theme.colors.gray900};
    color: ${theme.colors.white};
    padding: ${RFValue(theme.spacings.xsmall)}px;
    font-size: ${RFValue(theme.font.sizes.medium)}px;
    border-radius: 4px;
  `}
`

export const Error = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.warning};
    margin-top: ${RFValue(theme.spacings.xxsmall / 2)}px;
    font-size: ${RFValue(theme.font.sizes.small)}px;
  `}
`
