import { Box, Button, SxProps, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import GG from '@/assets/photos/Home/GraffitiGrab.png'
import Fest from '@/assets/photos/Home/PJKTFEST.png'
import Lenz from '@/assets/photos/Home/ProjektLenz.png'
import horrorcon from '@/assets/photos/Home/ProjektHorrorCon.png'
import PJKTCOM from '@/assets/photos/Home/PJKT-05.png'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default (props: { sx: SxProps }) => {
	const events: {
		name: string
		route: string
		image: string
		timeStart: number
		timeEnd: number
		secret?: true
	}[] = [
		{
			name: 'Graffiti Grab',
			image: GG,
			route: '/events/graffiti_grab',
			timeStart: new Date('April 2, 2023 12:00 AM').getTime(),
			timeEnd: new Date('April 9, 2023 11:59 PM').getTime(),
		},
		{
			name: 'FEST',
			image: Fest,
			route: '/events/fest',
			timeStart: new Date('June 23, 2023 2:00 PM').getTime(),
			timeEnd: new Date('June 25, 2023 12:00 AM').getTime(),
		},
		{
			name: 'Lenz',
			image: Lenz,
			route: '/events/lenz',
			timeStart: new Date('September 29, 2023 12:00 AM').getTime(),
			timeEnd: new Date('October 1, 2023 11:59 PM').getTime(),
		},
		{
			name: 'HorrorCon',
			image: horrorcon,
			route: '/events/horrorcon',
			timeStart: new Date('October 28, 2023 12:00 AM').getTime(),
			timeEnd: new Date('October 29, 2023 11:59 PM').getTime(),
		},
		// {
		// 	name: '???',
		// 	image: PJKTCOM,
		// 	timeStart: new Date('December 1, 2023 2:00 PM').getTime(),
		// 	timeEnd: new Date('December 3, 2023, 12:00 PM').getTime(),
		// 	secret: true,
		// },
	]

	const order = () => {
		const now = new Date().getTime()
		const future = events.filter((event) => event.timeStart > now)
		const past = events.filter((event) => event.timeEnd < now)
		const current = events.filter(
			(event) => event.timeStart < now && event.timeEnd > now
		)

		return [...current, ...future, ...past]
	}

	const filteredOrders = order()

	return (
		<Box
			display='flex'
			flexDirection='column'
			sx={{ ...props.sx, py: 5 }}
		>
			<Typography
				variant='h2'
				fontFamily={'Norwester'}
				align='center'
				py={2}
			>
				Our Events
			</Typography>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				spacing={5}
				sx={{
					flexGrow: 1,
				}}
			>
				{filteredOrders.map((event, i) => (
					<Grid
						md={i <= 1 ? 5 : 4}
						key={i}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<Box sx={{ aspectRatio: 1.5 }}>
							<Link to={event.route}>
								<Button>
									<Box
										component='img'
										src={event.image}
										width='100%'
										sx={{
											opacity: event.secret ? 0.5 : 1,
											m: 'auto',
										}}
									/>
								</Button>
							</Link>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}
