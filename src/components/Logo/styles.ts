import { Image } from 'react-native'
import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const ImageStyled = styled(Image)`
  height: ${RFValue(150)}px;
`
