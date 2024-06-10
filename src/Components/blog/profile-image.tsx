import React from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { resizeImage } from '~/utils/blog/image-utils'
import { clsx } from 'clsx'
import { DEFAULT_AVATAR } from '~/constant'

const ProfileImage: React.FC<{
	user: any
	blogUrl?: string | null
	postUrlForAnonymous?: any
	profileImage?: string
	className?: string
	width: string
	height: string
}> = ({ blogUrl, user, postUrlForAnonymous, className, height, width }) => {
	return (
		<Link
			href={
				blogUrl
					? blogUrl
					: user && !user.isDeactivated
						? `https://www.linkedin.com/in/nandanipaliwal/`
						: postUrlForAnonymous
							? postUrlForAnonymous
							: '#'
			}
			className={`relative block h-full w-full`}
		>
			<Image
				className={clsx(className, `relative z-20 block w-full rounded-full`)}
				src={
					user && user.profilePicture
						? resizeImage(user.profilePicture, {
								w: Number(width) || 70,
								h: Number(height) || 70,
								c: 'face'
							})
						: DEFAULT_AVATAR
				}
				width={width ? parseInt(width) : 70}
				height={height ? parseInt(height) : 70}
				// resize={{
				//   w: width ? parseInt(width) : 70,
				//   h: height ? parseInt(height) : 70,
				//   c: 'face',
				// }}
				alt={user ? user.name + "'s photo" : undefined}
			/>
		</Link>
	)
}

export default ProfileImage
