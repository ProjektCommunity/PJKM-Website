import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useState } from 'react'

import './events.css'
import { Link } from 'react-router-dom'

export default function Events() {
	// const sections: (() => JSX.Element)[] = [Header]
	//const events = Array(5).fill('https://via.placeholder.com/400x600.png') // Change the number of items as needed

	const events = [
		{
			name: 'Graffiti Grab',
			route: '/graffiti_grab',
			img: 'https://media.discordapp.net/attachments/1062043257531535360/1090692397903655104/graffitigrab-01-01-01.png?ex=655502f3&is=65428df3&hm=7f30f6680f5d4279840e10ce2e32a92e64ca40354ce45660227b8efd9dd92d97&=&width=811&height=456',
		},
		{
			name: 'Fest',
			route: '/fest',
			img: 'https://media.discordapp.net/attachments/1062043257531535360/1119390479813976147/PJKT_2023_Poster-01-_Compress_Twitter.jpg?ex=6557e69f&is=6545719f&hm=c1f24efcead891dc300d03e5e897a9217ece39c684a50e29fdad99cef883b569&=&width=409&height=614',
		},
		{
			name: 'Lenz',
			route: '/lenz',
			img: '/src/assets/photos/Events/GG-04.png',
		},
		{
			name: 'HorrorCon',
			route: '/horrorcon',
			img: 'https://media.discordapp.net/attachments/1063954825219424297/1159951012539420713/pjkthorrorconskeleposter.png?ex=6557cd90&is=65455890&hm=7cd02f381575cf35bfa33f4d2e604807831b5d55daf80ea7b7af042e828223ea&=&width=345&height=613',
		},
	]
	const gridSize = 5
	const columns = events.length % gridSize === 0 ? gridSize : events.length
	const totalColumns = 12
	const rows = Math.ceil(events.length / columns)

	return (
		<Grid
			container
			p={2}
			m={0}
			spacing={1}
			flexGrow={1}
		>
			{events.map((event, i) => (
				<Grid
					key={i}
					lg={totalColumns / columns}
					md={totalColumns / (columns / 2)}
					sm={12}
					xs={12}
					sx={{
						transition: 'width 0.1s ease',
						overflow: 'hidden',
					}}
				>
					<Link to={`/events${event.route}`}>
						<Button
							disableElevation={false}
							className='event_button'
							sx={{
								background: `url(${event.img})`,
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
									{event.name}
								</Typography>
							</Box>
						</Button>
					</Link>
				</Grid>
			))}
		</Grid>
	)
}
