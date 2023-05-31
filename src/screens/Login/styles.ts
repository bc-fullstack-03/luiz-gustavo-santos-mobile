import { KeyboardAvoidingView, ScrollView } from 'react-native'

import styled from 'styled-components/native'
import { Container } from '../../components'

export const KeyboardAvoidingViewStyled = styled(KeyboardAvoidingView)`
  flex: 1;
`

export const ScrollViewStyled = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1
  }
})``

export const Content = styled(Container)`
  align-items: center;
  justify-content: center;
`
