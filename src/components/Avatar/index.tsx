import { ImageSourcePropType } from 'react-native'

import * as S from './styles'

type AvatarProps = {
  source?: ImageSourcePropType
}

export const Avatar: React.FC<AvatarProps> = ({ source }) => {
  if (source) {
    return <S.ImageStyled source={source} />
  }
  return <S.AvatarIcon name="person-outline" size={70} />
}
