import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Box = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    gap: ${RFValue(theme.spacings.xxsmall)}px;
  `}
`

export const PressableStyled = styled.Pressable`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${RFValue(theme.spacings.xsmall)}px;
    padding: ${RFValue(theme.spacings.xsmall)}px;
    background: ${theme.colors.mainBg};
    border-radius: 4px;
  `}
`

export const ImageStyled = styled.Image`
  width: 100%;
  height: ${RFValue(200)}px;
  border-radius: 4px;
`
