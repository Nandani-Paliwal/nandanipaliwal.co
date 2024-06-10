'use client'
import { Canvas, useLoader } from '@react-three/fiber'
import { useScroll, useSpring } from 'framer-motion'
import { motion as motion3D } from 'framer-motion-3d'
import { useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

export default function Earth() {
	const [color, normal, aoMap] = useLoader(TextureLoader, [
		'/assets/project-section/color.jpg',
		'/assets/project-section/normal.png',
		'/assets/project-section/occlusion.jpg'
	])

	const scene = useRef(null)

	const { scrollYProgress } = useScroll({
		target: scene,

		offset: ['start end', 'end start']
	})

	const smoothRotation = useSpring(scrollYProgress, {
		damping: 20
	})
	return (
		<Canvas ref={scene}>
			<ambientLight intensity={0.1} />
			<directionalLight intensity={3.5} position={[1, 0, -0.25]} />
			<motion3D.mesh scale={2.5} rotation-y={smoothRotation}>
				<sphereGeometry args={[1, 64, 64]} />
				<meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
			</motion3D.mesh>
		</Canvas>
	)
}
