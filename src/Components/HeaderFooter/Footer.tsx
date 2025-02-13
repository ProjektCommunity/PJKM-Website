import { Box, Typography, Grid, Grid2 } from '@mui/material'
import { Twitter, YouTube } from '@mui/icons-material'
import PJKTFull from '@/assets/PJKT-01.png'
import { Link } from 'react-router-dom'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeSVGIcon, Kofi, Vrc } from '..'
import React, { useEffect, useState } from 'react'
import theme from '@/services/theme/theme'

export const Footer = () => {
	const [paddingWidth, setPaddingWidth] = useState(55)

	const checkPaddingWidth = () => {
		if (window.innerWidth > 1440) {
			setPaddingWidth((window.innerWidth - 1000) / 8)
		} else {
			return setPaddingWidth(55)
		}
	}

	useEffect(() => {
		checkPaddingWidth()
		window.addEventListener('resize', checkPaddingWidth)
		return () => window.removeEventListener('resize', checkPaddingWidth)
	}, [])

	return (
		<Grid2
			container
			gap={0}
			spacing={4}
			sx={{
				px: {
					xl: paddingWidth,
					lg: 30,
					md: 20,
					xs: 10,
				},
				py: 6,
				backgroundColor: theme.palette.accentDark.main,
				color: theme.palette.accentDark.contrastText,
			}}
		>
			<Grid2 size={{ xl: 3, md: 6, xs: 12 }}>
				<Box
					sx={{
						backgroundImage: `url(${PJKTFull})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						width: '100%',
						height: '100%',
						minHeight: '150px',
						maxWidth: '150px',
						mx: 'auto',
					}}
				/>
			</Grid2>
			<Grid2
				size={{ xl: 3, md: 6, xs: 12 }}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box>
					<Typography
						variant='h6'
						sx={{ textDecoration: 'underline' }}
					>
						Contact Us
					</Typography>
					<Typography
						variant='h6'
						sx={{ textDecoration: 'underline' }}
					>
						Business
					</Typography>
					<Link
						to='mailto:business@projektcommunity.com'
						target='_blank'
					>
						<Typography
							variant='caption'
							sx={{
								'&:hover': {
									color: theme.palette.tertiary.main,
									textDecoration: 'underline',
									WebkitTextFillColor:
										theme.palette.tertiary.main,
								},
							}}
						>
							business@projektcommunity.com
						</Typography>
					</Link>
					<Typography
						variant='h6'
						sx={{ textDecoration: 'underline' }}
					>
						Support
					</Typography>
					<Link
						to='mailto:support@projektcommunity.com'
						target='_blank'
					>
						<Typography
							variant='caption'
							sx={{
								'&:hover': {
									color: theme.palette.tertiary.main,
									textDecoration: 'underline',
									WebkitTextFillColor:
										theme.palette.tertiary.main,
								},
							}}
						>
							support@projektcommunity.com
						</Typography>
					</Link>
				</Box>
			</Grid2>
			<Grid2
				size={{ xl: 3, md: 6, xs: 12 }}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box>
					<Typography
						variant='h6'
						sx={{ textDecoration: 'underline' }}
					>
						Quick Links
					</Typography>
					{[
						{ name: 'Events', path: '/events' },
						{ name: 'Groups', path: '/groups' },
						{ name: 'Blog', path: '/blog' },
						{ name: 'Shop', path: '/shop' },
						{ name: 'About', path: '/about' },
						{ name: 'Contact / FAQ', path: '/contact' },
					].map((page, i) => (
						<Link
							to={page.path}
							key={i}
						>
							<Typography
								variant='body1'
								sx={{
									width: 'fit-content',
									textDecoration: 'underline',
									cursor: 'pointer',
									'&:hover': {
										color: theme.palette.tertiary.main,
										textDecoration: 'underline',
										WebkitTextFillColor:
											theme.palette.tertiary.main,
									},
								}}
							>
								{page.name}
							</Typography>
						</Link>
					))}
				</Box>
			</Grid2>
			<Grid2
				size={{ xl: 3, md: 6, xs: 12 }}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						height: '100%',
					}}
				>
					<Typography
						variant='h6'
						sx={{ textDecoration: 'underline' }}
					>
						Stay Connected
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
						}}
					>
						{[
							{
								name: 'Youtube',
								link: 'https://www.youtube.com/@PJKT',
								icon: <YouTube />,
							},
							{
								name: 'Twitter',
								link: 'https://twitter.com/PJKT_COM',
								icon: <Twitter />,
							},
							{
								name: 'Discord',
								link: 'https://discord.gg/PJKT',
								icon: <FontAwesomeSVGIcon icon={faDiscord} />,
							},
							{
								name: 'Ko-fi',
								link: 'https://ko-fi.com/pjkt',
								icon: <Kofi />,
							},
							{
								name: 'VRC Group',
								link: 'https://vrc.group/PJKT.3741',
								icon: <Vrc />,
							},
						].map((social, i) => (
							<Box
								key={i}
								display='flex'
								flexDirection='row'
								alignItems='center'
								gap={1}
								onClick={() =>
									window.open(social.link, '_blank')
								}
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									cursor: 'pointer',
									'&:hover': {
										color: theme.palette.tertiary.main,
										textDecoration: 'underline',
										WebkitTextFillColor:
											theme.palette.tertiary.main,
									},
								}}
							>
								<Typography variant='body1'>
									{social.name}
								</Typography>
								<Box>{social.icon}</Box>
							</Box>
						))}
					</Box>
				</Box>
			</Grid2>
		</Grid2>
	)
}
