import { Image } from 'react-native'
import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    width: 100%;
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.gray500};
    padding: ${RFValue(theme.spacings.xsmall)}px 0;
  `}
`
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
export const Box = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    gap: ${RFValue(theme.spacings.xxsmall)}px;
  `}
`

export const BoxName = styled.View`
  margin-top: -3px;
`

export const SmallText = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(10)}px;
    color: ${theme.colors.gray500};
  `}
`

export const ImageStyled = styled(Image)`
  width: 100%;
  height: ${RFValue(240)}px;
  border-radius: 12px;
`
export const Footer = styled(Box)`
  ${({ theme }) => css`
    gap: ${RFValue(theme.spacings.xsmall)}px;
  `}
`
