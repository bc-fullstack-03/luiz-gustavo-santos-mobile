import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  width: 100%;
  flex: 1;
`

export const Form = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const TextField = styled.TextInput`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.mainBg};
    color: ${theme.colors.white};
    padding: ${RFValue(12)}px ${RFValue(theme.spacings.xsmall)}px;
    font-size: ${RFValue(theme.font.sizes.medium)}px;
    border-radius: 4px;
  `}
`
