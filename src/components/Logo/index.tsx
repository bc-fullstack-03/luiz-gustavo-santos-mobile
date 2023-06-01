import { ImageStyled } from './styles'

import logo from '../../../assets/parrot-logo.png'

export const Logo = () => {
  return <ImageStyled source={logo} resizeMode="contain" resizeMethod="scale" />
}
