import { Box, SxProps, useTheme } from '@mui/material'
import * as Components from '@/Components'
import './HomeStyles.css'
import { useEffect, useState } from 'react'

function Home() {
	const theme = useTheme()
	console.log(theme.breakpoints.up(1920))
	const [paddingWidth, setPaddingWidth] = useState(10)
	const components: ((props: { sx: SxProps }) => JSX.Element)[] = [
		Components.Home.AnnouncementBanner,
		Components.Home.Events,
		Components.Home.AboutUs,
		Components.Home.Join,
		Components.Home.Latest,
	]

	const checkPaddingWidth = () => {
		if (window.innerWidth > 1440) {
			setPaddingWidth((window.innerWidth - 1000) / 8)
			console.log((window.innerWidth - 1000) / 8)
		} else {
			console.log('55px')
			return setPaddingWidth(55)
		}
	}

	useEffect(() => {
		checkPaddingWidth()
		window.addEventListener('resize', checkPaddingWidth)
		return () => window.removeEventListener('resize', checkPaddingWidth)
	}, [])
	return (
		<Box>
			<Components.Home.Hero />
			{components.map((Component, index) => (
				<Box
					key={index}
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					sx={{
						backgroundColor: (theme) =>
							index % 2 === 0
								? theme.palette.background.default
								: theme.palette.background.paper,
					}}
				>
					<Component
						sx={{
							px: {
								xs: 2.5,
								sm: 5,
								md: 10,
								xl: paddingWidth,
							},
							py: 4,
						}}
					/>
				</Box>
			))}
		</Box>
	)
}

export default Home
