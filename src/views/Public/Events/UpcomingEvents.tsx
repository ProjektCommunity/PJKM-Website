import { EventList } from '@/Components/eventList'
import { ArrowBack } from '@mui/icons-material'
import {
	Box,
	Button,
	Grid2,
	SxProps,
	Typography,
	useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'

import * as API from '@/utils/API'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCamera,
	faEgg,
	faGhost,
	faPenNib,
	faSprayCan,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function UpcomingEvents(props?: {} & { sx: SxProps }) {
	const theme = useTheme()
	const [projects, setProjects] = useState<EventList>(new EventList([]))

	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

	useEffect(() => {
		const getEvents = async () => {
			const projectList = new EventList(await API.getProjects())
			setProjects(projectList)
		}
		if (projects.list.length === 0) getEvents()
	}, [projects])
	return (
		<Box sx={{ ...props?.sx }}>
			<Box
				sx={{
					position: 'relative',
				}}
			>
				<Typography
					variant='h1'
					textAlign='center'
					sx={{
						textDecoration: 'underline',
					}}
				>
					Events
				</Typography>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: 0,
						transform: 'translate(0, -50%)',
					}}
				>
					<Link to='/events/past'>
						<Button
							variant='text'
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<ArrowBack color='action' />
							<Typography
								variant='body1'
								sx={{
									textDecoration: 'underline',
								}}
							>
								Past Events
							</Typography>
						</Button>
					</Link>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
				}}
			>
				{projects.getUpcoming().map((project, i) => {
					const {
						name,
						ProjectTag,
						start_date,
						end_date,
						Logo,
						Poster,
					} = project
					let color = undefined
					const Icon =
						(project.ProjectTag?.name === 'Fest' && faSprayCan) ||
						(project.ProjectTag?.name === 'Graffiti Grab' &&
							faEgg) ||
						(project.ProjectTag?.name === 'HorrorCon' && faGhost) ||
						(project.ProjectTag?.name === 'Lenz' && faCamera) ||
						faPenNib

					const iconSize = '2xl'
					if (ProjectTag) {
						const hex = ProjectTag.color
						const r = parseInt(hex.substring(1, 3), 16)
						const g = parseInt(hex.substring(3, 5), 16)
						const b = parseInt(hex.substring(5, 7), 16)
						color = `rgba(${r}, ${g}, ${b}, 1)`
					}

					return (
						<Link
							to={`/events/${project.id}`}
							key={i}
						>
							<Button
								variant='text'
								key={i}
								sx={{
									p: 0,
									m: 0,
									display: 'block',
									transition: 'all 0.2s',
									width: '100%',
									'&:hover': {
										transform: 'scale(1.05)',
									},
								}}
							>
								<Box
									position='relative'
									key={i}
									borderRadius={7}
									overflow='hidden'
									justifyContent='space-between'
									sx={{
										backdropFilter: 'blur(10px)',
										boxShadow: `0px 4px 4px 0px rgba(0, 0, 0, 0.25),
									inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
									inset 0px -4px 4px 0px rgba(255, 255, 255, 0.25)`,
									}}
								>
									<Box
										sx={{
											width: '100%',
											background: `linear-gradient(90deg, ${color} 0%, rgba(255, 255, 255, 0) 100%)`,
										}}
									>
										<Grid2
											container
											px={8}
											py={4}
											sx={{
												position: 'relative',
												width: '100%',
											}}
										>
											<Grid2
												size={{ xs: 12, sm: 9 }}
												sx={{
													width: '100%',
												}}
											>
												<Box
													height='100%'
													display='flex'
													flexDirection='column'
													justifyContent='flex-end'
													sx={{
														color: theme.palette
															.accentLight
															.contrastText,
														fill: theme.palette
															.accentLight
															.contrastText,
														WebkitTextFillColor:
															theme.palette
																.accentLight
																.contrastText,
													}}
												>
													<Box
														sx={{
															// white stroke
															filter: 'drop-shadow(1px 1px 0px #fff) drop-shadow(-1px -1px 0px #fff) drop-shadow(1px -1px 0px #fff) drop-shadow(-1px 1px 0px #fff)',
															height: '31.32px',
															width: '35.79px',
															display: 'flex',
															justifyContent:
																'center',
															alignItems:
																'center',
														}}
													>
														<FontAwesomeIcon
															icon={Icon}
															size={iconSize}
															id={`icon-${i}`}
															style={{
																height: '31.32px',
																width: '35.79px',
															}}
														/>
													</Box>
													<Typography
														variant='h4'
														sx={{
															textAlign: 'start',
															textTransform:
																'uppercase',
															textShadow:
																'1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff',
															fontWeight: 700,
														}}
													>
														{name}
													</Typography>
													<Typography
														variant='body1'
														sx={{
															textAlign: 'start',
															color: theme.palette
																.accentLight
																.contrastText,
														}}
													>
														{formatter.format(
															project.start_date
														)}{' '}
														-{' '}
														{formatter.format(
															project.end_date
														)}
													</Typography>
												</Box>
											</Grid2>
											<Grid2 size={{ xs: 12, sm: 3 }}>
												<Box
													component='img'
													src={Logo?.path}
													alt={Logo?.name}
													width='100%'
													height='150px'
													sx={{
														objectFit: 'contain',
													}}
												/>
											</Grid2>
										</Grid2>
									</Box>
									<Background
										id={`icon-${i}`}
										color={ProjectTag?.color}
									/>

									<Box
										position='absolute'
										top={0}
										left={0}
										height='100%'
										width='100%'
										component='img'
										src={Poster?.path}
										sx={{
											objectFit: 'cover',
											filter: 'blur(10px)',
											opacity: 0.25,
										}}
									/>
								</Box>
							</Button>
						</Link>
					)
				})}
			</Box>
		</Box>
	)
}

function Background(props: { id: string; color: string | undefined }) {
	const [encodedData, setEncodedData] = useState('')

	useEffect(() => {
		const svgEl = document.getElementById(props.id)
		if (svgEl) {
			let newSVG = svgEl.cloneNode(true) as SVGSVGElement

			const color = props.color || '#000'
			newSVG.setAttribute('fill', color)
			newSVG.setAttribute('stroke', color)
			newSVG.setAttribute('stroke-width', '2')

			const svgString = new XMLSerializer().serializeToString(newSVG)
			const b = window.btoa(svgString)

			const img = new Image()
			img.src = `url('data:image/svg+xml;base64,${b}')`
			img.width = 512
			img.height = 512

			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			if (ctx) {
				console.log(img.width, img.height)
				canvas.width = img.width
				canvas.height = img.height
				ctx?.drawImage(img, 0, 0)
				const data = canvas.toDataURL('image/png')
				console.log(data)
				setEncodedData(data)
			}
		}
	}, [encodedData])
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				fontSize: '2rem',
				fontWeight: 700,
				height: '100%',
				width: '100%',
				zIndex: -1,
			}}
		>
			<Box
				width='100%'
				height='100%'
				sx={{
					backgroundImage: `url(${encodedData})`,
					backgroundSize: '40px',
					backgroundPosition: 'center',
					backgroundRepeat: 'repeat-x',
					// rotate backgroundImage
				}}
			/>
		</Box>
	)
}
