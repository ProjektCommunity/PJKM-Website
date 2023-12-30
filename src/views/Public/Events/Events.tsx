import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import * as API from '@/utils/API'
import { useEffect, useState } from 'react'
import './events.css'
import { Link } from 'react-router-dom'
import { EventList } from '@/Components/eventList'

export default function Events() {
	const [state, dispatch] = useState<
		| { init: false }
		| {
				init: true
				projects: { name: string; route: string; image: string }[]
		  }
	>({ init: false })

	// const sections: (() => JSX.Element)[] = [Header]
	//const events = Array(5).fill('https://via.placeholder.com/400x600.png') // Change the number of items as needed

	useEffect(() => {
		async function init() {
			const eventlist = new EventList(await API.getProjects())
			dispatch({ init: true, projects: eventlist.getEventPageList() })
			console.log({ init: true, projects: eventlist.getEventPageList() })
		}
		if (!state.init) {
			init()
		}
	}, [state])

	const gridSize = 5
	const totalColumns = 12

	return (
		<Grid
			container
			p={2}
			m={0}
			spacing={1}
			flexGrow={1}
		>
			{state.init &&
				state.projects.map((project, i) => (
					<Grid
						key={i}
						xl={
							totalColumns /
							(state.projects.length % gridSize === 0
								? gridSize
								: state.projects.length)
						}
						lg={
							totalColumns /
							((state.projects.length % gridSize === 0
								? gridSize
								: state.projects.length) /
								2)
						}
						md={12}
						sm={12}
						xs={12}
						
						sx={{
							transition: 'width 0.1s ease',
							overflow: 'hidden',
						}}
					>
						<Link to={project.route}>
							<Button
								disableElevation={false}
								className='event_button'
								sx={{
									background: `url(${project.image})`,
									backgroundPosition: 'center',
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									width: '100%',
									height: '100%',
								}}
							>
								{/* Text should be at the bottom and have a dark gradiant half way up the button */}
								<Box
									sx={{
										position: 'absolute',
										bottom: 0,
										width: '100%',
										background:
											'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))',
										padding: '1rem',
										textAlign: 'center',
									}}
								>
									<Typography
										sx={{
											color: 'white',
											fontWeight: 'bold',
											fontSize: '1.5rem',
											textShadow:
												'2px 2px 4px rgba(0, 0, 0, 0.5)',
										}}
									>
										{project.name}
									</Typography>
								</Box>
							</Button>
						</Link>
					</Grid>
				))}
		</Grid>
	)
}
