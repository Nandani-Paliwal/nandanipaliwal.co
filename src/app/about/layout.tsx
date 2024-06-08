import Providers from '../../Components/providers'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="light" style={{ colorScheme: 'light' }}>
			<body>
				<Providers>
					{/* <CustomCursor /> */}
					{/* <Header /> */}
					{children}
				</Providers>
			</body>
		</html>
	)
}
