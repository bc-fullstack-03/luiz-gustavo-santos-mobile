import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

type LoadingProps = {
  size?: number | 'small' | 'large' | undefined
} & ActivityIndicatorProps

export const Loading: React.FC<LoadingProps> = ({
  size = 'small',
  ...props
}) => {
  return <ActivityIndicator size={size} {...props} />
}
