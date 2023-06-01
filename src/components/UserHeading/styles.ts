import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import Ionicons from '@expo/vector-icons/Ionicons'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    gap: ${RFValue(theme.spacings.xxsmall)}px;
  `}
`

export const Icon = styled(Ionicons)`
  ${({ theme }) => css`
    color: ${theme.colors.gray100};
  `}
`

export const FollowerContent = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    margin-top: ${RFValue(theme.spacings.xxsmall)}px;
    margin-left: ${RFValue(theme.spacings.xxsmall / 2)}px;
    gap: ${RFValue(theme.spacings.xxsmall)}px;
  `}
`
