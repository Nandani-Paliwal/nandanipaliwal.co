import { Dialog, Transition } from '@headlessui/react'
import { type VariantProps, cva } from 'class-variance-authority'
import React, { Fragment, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const customModalClassVariants = cva('relative z-10', {
	variants: {
		intent: {
			primary: 'focus:ring-primary-500',
			secondary: 'focus:ring-secondary-500',
			glass: 'focus:ring-primary-500',
			destructive: 'focus:ring-destructive-500'
		},
		position: {
			center: '',
			bottomRight: '',
			bottomLeft: '',
			topRight: '',
			topLeft: ''
		},
		size: {
			small: 'rounded-md px-2.5 py-1.5 text-xs',
			medium: 'rounded-lg px-3 py-2 text-sm',
			large: 'rounded-lg px-4 py-2.5 text-base'
		},
		dismissible: {
			true: ''
		}
	},
	defaultVariants: {
		intent: 'primary',
		position: 'center',
		size: 'medium',
		dismissible: false
	}
})

interface CustomModalProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof customModalClassVariants> {
	onClose: () => void
	setIsOpen: (val: boolean) => void
	isOpen: boolean
}

const CustomModal: React.FC<React.PropsWithChildren<CustomModalProps>> = ({
	onClose,
	isOpen,
	setIsOpen,
	className,
	position,
	size,
	children,
	dismissible
}) => {
	function closeModal() {
		setIsOpen(false)
		onClose()
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className={twMerge(
					customModalClassVariants({ className, position, size, dismissible }),
					'relative z-10'
				)}
				onClose={closeModal}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default CustomModal
