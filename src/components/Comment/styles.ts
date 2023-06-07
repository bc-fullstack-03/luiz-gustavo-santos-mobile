import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    padding: ${RFValue(theme.spacings.xxsmall)}px;
    border-radius: 4px;
    background: ${theme.colors.gray500}99;
  `}
`

export const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
