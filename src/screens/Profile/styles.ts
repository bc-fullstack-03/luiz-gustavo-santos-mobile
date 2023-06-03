import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container } from '../../components'

export const Wrapper = styled(Container)`
  padding-top: 0;
  align-items: center;
`

export const FollowerContent = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    margin-top: ${RFValue(theme.spacings.xxsmall)}px;
    gap: ${RFValue(theme.spacings.xxsmall)}px;
  `}
`

export const ButtonsContainer = styled(FollowerContent)`
  ${({ theme }) => css`
    margin-top: ${RFValue(theme.spacings.small)}px;
  `}
`

export const Button = styled.TouchableOpacity`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${RFValue(theme.spacings.xxsmall)}px;
  `}
`

export const PostsContent = styled.View`
  ${({ theme }) => css`
    margin-top: ${RFValue(theme.spacings.small)}px;
  `}
`
