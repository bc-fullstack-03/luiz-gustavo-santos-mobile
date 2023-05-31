import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

type Props = {
  size?: number
}

export const Wrapper = styled.View<Props>`
  ${({ theme, size }) => css`
    margin-bottom: ${RFValue(size || theme.spacings.xsmall)}px;
  `}
`
