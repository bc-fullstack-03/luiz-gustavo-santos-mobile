import { useTheme } from 'styled-components/native'
import { Text } from '../Text'

import * as S from './styles'

type UserHeadingProps = {
  username: string
  totalFollowers: number
  totalFollowing: number
}

export const UserHeading: React.FC<UserHeadingProps> = ({
  totalFollowers,
  totalFollowing,
  username
}) => {
  const { colors } = useTheme()
  return (
    <>
      <S.Wrapper>
        <S.Icon name="person-circle-outline" size={28} />
        <Text size="large" color={colors.white}>
          {username}
        </Text>
      </S.Wrapper>
      <S.FollowerContent>
        <Text size="xsmall" color={colors.gray100}>
          {totalFollowers} seguidores
        </Text>
        <Text size="xsmall" color={colors.gray100}>
          |
        </Text>
        <Text size="xsmall" color={colors.gray100}>
          Seguindo {totalFollowing}
        </Text>
      </S.FollowerContent>
    </>
  )
}
