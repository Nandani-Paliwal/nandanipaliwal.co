'use client'

import { useEffect, useRef, useState } from 'react'
import { type AnimatedIconPlayerProps, PlayerTriggerStateEnum } from '~/types'

const _AnimatedIconPlayer: React.FC<AnimatedIconPlayerProps> = ({
	iconSrc,
	size,
	trigger,
	color
}) => {
	const [Player, setPlayer] = useState<any>(null)

	useEffect(() => {
		async function importLib() {
			const Player = (await import('@lordicon/react')).Player
			setPlayer(() => Player)
		}

		importLib().catch(error => console.error(error))
	}, [])

	const playerRef = useRef(null)
	const [shouldPlay, setShouldPlay] = useState(trigger === PlayerTriggerStateEnum.Loop)
	const [icon, setIcon] = useState<Record<string, any> | null>(null)
	const handleMouseEnter = () => {
		if (
			trigger === PlayerTriggerStateEnum.Hover ||
			trigger === PlayerTriggerStateEnum.LoopOnHover
		) {
			setShouldPlay(true)
		}
	}

	const handleMouseLeave = () => {
		if (trigger === PlayerTriggerStateEnum.Hover) {
			setShouldPlay(false)
		}
	}

	const handleClick = () => {
		if (trigger === PlayerTriggerStateEnum.Click) {
			setShouldPlay(!shouldPlay)
		}
	}

	useEffect(() => {
		if (trigger === PlayerTriggerStateEnum.Loop) {
			setShouldPlay(true)
		}
	}, [trigger])

	useEffect(() => {
		if (playerRef.current && shouldPlay) {
			// @ts-ignore type issues here
			playerRef.current.playFromBeginning()
		}
	}, [shouldPlay])

	useEffect(() => {
		fetch(iconSrc)
			.then(res => res.json())
			.then(data => {
				setIcon(data)
			})
			.catch(error => console.error(error))
	}, [iconSrc])

	return (
		<span
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			className="w-fit"
		>
			{icon && Player && (
				<Player
					colorize={color}
					ref={playerRef}
					icon={icon}
					key={iconSrc}
					size={size}
					onComplete={() => {
						if (
							trigger === PlayerTriggerStateEnum.Loop ||
							trigger === PlayerTriggerStateEnum.LoopOnHover
						) {
							// @ts-ignore type issues here
							playerRef.current?.playFromBeginning()
						}
					}}
				/>
			)}
		</span>
	)
}

export default _AnimatedIconPlayer
