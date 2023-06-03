import { Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const ImageStyled = styled(Image)`
  width: ${RFValue(70)}px;
  height: ${RFValue(70)}px;
  border-radius: ${RFValue(70)}px;
  object-fit: cover;
`

export const AvatarIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.gray100};
`
