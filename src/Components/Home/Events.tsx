import { Box, Button, SxProps, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EventList } from '@/Components/eventList'
import * as API from '@/utils/API'

export default (props: { sx: SxProps }) => {
	const [projects, setProjects] = useState<
		{
			name: string
			route: string
			image: string
			buttonImg: string
			start: string
			end: string
			secret?: boolean
		}[]
	>([])

	useEffect(() => {
		const getEvents = async () => {
			const eventList = new EventList(await API.getProjects())
			console.log(eventList.getEventPageList())
			setProjects(eventList.getEventPageList())
		}
		if (projects.length > 0) return
		getEvents()
	}, [projects, setProjects])

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
				{projects.map((event, i) => (
					<Grid
						md={i <= 1 ? 5 : 4}
						key={i}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<Box sx={{ aspectRatio: 1.5 }}>
							{event.route && (
								<Link to={event.route}>
									<Button>
										<Box
											component='img'
											src={event.buttonImg}
											width='100%'
											sx={{
												opacity: event.secret ? 0.5 : 1,
												transition: '0.3s',
												m: 'auto',
												'&:hover': {
													transform: 'scale(1.1)',
												},
											}}
										/>
									</Button>
								</Link>
							)}
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}
