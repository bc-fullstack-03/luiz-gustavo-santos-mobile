import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Wrapper = styled.View`
  width: 100%;
`

type Props = {
  hasIcon?: boolean
}

export const ContainerInput = styled.View<Props>`
  ${({ theme, hasIcon }) => css`
    width: 100%;
    flex-direction: row;
    align-items: center;
    background: ${theme.colors.gray900};
    border-radius: 4px;
    ${hasIcon &&
    css`
      padding-left: ${RFValue(theme.spacings.xxsmall)}px;
    `}
  `}
`

export const TextInput = styled.TextInput`
  ${({ theme }) => css`
    flex: 1;
    background: transparent;
    color: ${theme.colors.white};
    padding: ${RFValue(theme.spacings.xsmall)}px;
    font-size: ${RFValue(theme.font.sizes.medium)}px;
  `}
`

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray100};
    font-size: ${RFValue(theme.font.sizes.medium)}px;
    margin-bottom: ${RFValue(theme.spacings.xxsmall / 2)}px;
  `}
`

export const Error = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.warning};
    margin-top: ${RFValue(theme.spacings.xxsmall / 2)}px;
    font-size: ${RFValue(theme.font.sizes.small)}px;
  `}
`
