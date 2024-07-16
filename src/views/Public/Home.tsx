import { Box, Divider, SxProps, Typography } from '@mui/material'
import { AboutUs, Hero, Events, Join } from '@/Components/Home'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import './HomeStyles.css'

function Home() {
	const components: ((props: { sx: SxProps }) => JSX.Element)[] = [
		AboutUs,
		Events,
		Join,
	]
	return (
		<Box>
			<Hero />
			{components.map((Component, index) => (
				<Box
					key={index}
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
				>
					<Component
						sx={{ px: { xs: 5, sm: 5, md: 10, xl: 25 }, pt: '8em' }}
					/>
					<Divider sx={{ mt: 'auto' }} />
				</Box>
			))}
		</Box>
	)
}

export default Home
