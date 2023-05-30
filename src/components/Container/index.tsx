import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    padding: ${RFValue(theme.spacings.small)}px ${theme.spacings.xsmall}px;
    background: ${theme.colors.mainBg};
  `}
`
