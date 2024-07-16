import { Box, IconButton, Typography } from '@mui/material'
import { Twitter, YouTube } from '@mui/icons-material'
import PJKTFull from '@/assets/PJKT-01.png'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { Kofi, FontAwesomeSVGIcon } from '..'
import React from 'react'

export const Footer = (props: { ref?: React.RefObject<HTMLElement> }) => {
	return (
		<Box
			p={4}
			className='footer'
		>
			<Grid
				container
				sx={{ height: '100%', width: '100%' }}
			>
				<Grid // Logo
					md={3}
					display='flex'
					justifyContent='center'
					alignItems='center'
				>
					<Box
						component='img'
						src={PJKTFull}
						width={'50%'}
					/>
				</Grid>
				<Grid // Contact Info
					md={3}
					display='flex'
					flexDirection='column'
				>
					<Typography
						variant='h3'
						fontFamily={'Norwester'}
					>
						Contact
					</Typography>
					<Box
						flexGrow={0.5}
						display='flex'
						flexDirection='column'
						justifyContent='space-evenly'
					>
						<Box>
							<Typography
								variant='h6'
								fontWeight='bold'
							>
								Business
							</Typography>
							<Typography>
								<Box
									component='a'
									target='_blank'
									href='mailto:business@projektcommunity.com'
								>
									business@projektcommunity.com
								</Box>
							</Typography>
						</Box>

						<Box>
							<Typography
								variant='h6'
								fontWeight='bold'
							>
								Support
							</Typography>
							<Typography>
								<Box
									component='a'
									target='_blank'
									href='mailto:support@projektcommunity.com'
								>
									support@projektcommunity.com
								</Box>
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid md={3}>
					{' '}
					{/* Quick Links */}
					<Typography
						variant='h3'
						fontFamily={'Norwester'}
					>
						Quick Links
					</Typography>
					<Box p={2}>
						<Link to={'/Events'}>
							<Typography variant='h5'>Events</Typography>
						</Link>
						{/* <Typography variant='h5'>Volunteer</Typography> */}
						<Link to={'/FAQ'}>
							<Typography variant='h5'>FAQ</Typography>
						</Link>
						{/* <Typography variant='h5'>Terms of Service</Typography> */}
					</Box>
				</Grid>
				<Grid //Socials
					md={3}
					display='flex'
					flexDirection='column'
					justifyContent='start'
					alignItems='center'
					spacing={3}
				>
					<Typography
						variant='h3'
						fontFamily={'Norwester'}
					>
						Socials
					</Typography>
					<Box p={2}>
						<IconButton
							href='https://www.youtube.com/@PJKT'
							target='_blank'
						>
							<YouTube fontSize='medium' />
						</IconButton>
						<IconButton
							href='https://twitter.com/PJKT_COM'
							target='_blank'
						>
							<Twitter fontSize='large' />
						</IconButton>
						<IconButton
							href='https://discord.gg/PJKT'
							target='_blank'
						>
							<FontAwesomeSVGIcon icon={faDiscord} />
						</IconButton>
						<IconButton
							href='https://ko-fi.com/pjkt'
							target='_blank'
						>
							<Kofi />
						</IconButton>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
