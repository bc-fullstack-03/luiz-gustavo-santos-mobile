import * as S from './styles'

type SeparatorProps = {
  size?: number
}

export const Separator: React.FC<SeparatorProps> = ({ size }) => {
  return <S.Wrapper size={size} />
}
