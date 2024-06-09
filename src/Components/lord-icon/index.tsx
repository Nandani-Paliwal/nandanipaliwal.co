import React from 'react'
import _AnimatedIconPlayer from './lord-icon-player'
import { type AnimatedIconPlayerProps } from '~/types'

const AnimatedIconPlayer: React.FC<AnimatedIconPlayerProps> = props => {
	return <_AnimatedIconPlayer {...props} />
}

export default AnimatedIconPlayer
