import styled, { css } from 'styled-components/native'
import { Container } from '../Container'
import { RFValue } from 'react-native-responsive-fontsize'

export const Wrapper = styled(Container)`
  ${({ theme }) => css`
    background: ${theme.colors.gray900};
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    margin-top: 5%;
  `}
`

export const Heading = styled.View`
  ${({ theme }) => css`
    width: 100%;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.gray500};
    padding-bottom: ${RFValue(theme.spacings.xsmall / 2)}px;
    margin-bottom: ${RFValue(theme.spacings.small)}px;
  `}
`

export const ButtonClose = styled.TouchableOpacity`
  margin-left: auto;
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  align-items: center;
  justify-content: center;
`
