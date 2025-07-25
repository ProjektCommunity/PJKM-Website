import {
	Box,
	SxProps,
	Typography,
	Grid2,
	useTheme,
	IconButton,
	Button,
	Theme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EventList } from '@/Components/eventList'
import * as API from '@/utils/API'
import { ArrowForward, ArrowLeft, ArrowRight } from '@mui/icons-material'
import { BoxProps } from '.'

export default (props?: BoxProps) => {
	const theme = useTheme()
	const navigate = useNavigate()
	const [projects, setProjects] = useState<EventList>(new EventList([]))
	const [arrowDisabled, setArrowDisabled] = useState({
		left: true,
		right: false,
	})
	const [canScroll, setCanScroll] = useState(false)
	const [eventScroll, setEventScroll] = useState<HTMLDivElement | null>(null)

	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

	function checkArrows() {
		if (!eventScroll) return
		console.log(
			`${eventScroll.scrollWidth} >= ${eventScroll.clientWidth}: ${
				eventScroll.scrollWidth >= eventScroll.clientWidth
			}`
		)
		if (eventScroll.scrollWidth >= eventScroll.clientWidth)
			setCanScroll(true)
		else setCanScroll(false)

		setArrowDisabled({
			left: eventScroll.scrollLeft === 0,
			right:
				eventScroll.scrollLeft ===
				eventScroll.scrollWidth - eventScroll.clientWidth,
		})
	}

	function handleScroll(config: { left: number }): void
	function handleScroll(config: { right: number }): void
	function handleScroll(config: { left?: number; right?: number }) {
		console.log(config)
		const { left, right } = config
		const el = eventScroll
		if (!el) return
		el.scrollTo({
			left: el.scrollLeft + (left ? -left : right ? right : 0),
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		const getEvents = async () => {
			const projectList = new EventList(await API.getProjects())
			setProjects(projectList)
		}
		if (projects.list.length === 0) getEvents()
	}, [projects])

	useEffect(() => {
		if (!eventScroll) return
		eventScroll.addEventListener('scroll', checkArrows)
		window.addEventListener('resize', () => {
			if (!eventScroll) return
			if (eventScroll.scrollWidth > eventScroll.offsetWidth)
				setCanScroll(true)
			else setCanScroll(false)
		})
		if (!eventScroll) return
		if (eventScroll.scrollWidth > eventScroll.offsetWidth)
			setCanScroll(true)
		else setCanScroll(false)
		return () => {
			eventScroll.removeEventListener('scroll', checkArrows)
			window.removeEventListener('resize', () => {
				if (!eventScroll) return
				if (eventScroll.scrollWidth > eventScroll.offsetWidth)
					setCanScroll(true)
				else setCanScroll(false)
			})
		}
	}, [eventScroll, canScroll])
	return (
		<Box
			display='flex'
			flexDirection='column'
			{...props}
		>
			<Grid2 container>
				<Grid2
					size={4}
					sx={{
						display: { xs: 'none', md: 'block' },
					}}
				/>
				<Grid2 size={{ xs: 12, md: 4 }}>
					<Link to='/events'>
						<Typography
							variant='h2'
							align='center'
							sx={{
								textDecoration: 'underline',
								fontWeight: 'bold',
							}}
						>
							UPCOMING EVENTS
						</Typography>
					</Link>
				</Grid2>
				<Grid2 size={{ xs: 12, md: 4 }}>
					<Box
						height='60px'
						display='flex'
						alignItems='center'
						justifyContent='flex-end'
						sx={{
							color: (theme) =>
								theme.palette.accentDark.contrastText,
						}}
					>
						<Box
							display='flex'
							alignItems='center'
							onClick={() => {
								navigate('/events/past')
							}}
							sx={{
								cursor: 'pointer',
								color: theme.palette.accentDark.contrastText,
								'&:hover': {
									color: theme.palette.primary.light,
								},
							}}
						>
							<Typography
								sx={{
									color: theme.palette.accentDark
										.contrastText,
									'&:hover': {
										color: theme.palette.primary.light,
									},
								}}
							>
								Past Events
							</Typography>
							<ArrowForward />
						</Box>
					</Box>
				</Grid2>
				{projects.list.length > 0 && (
					<Grid2
						container
						size={12}
						spacing={5}
						sx={{
							flexGrow: 1,
						}}
						display='flex'
						justifyContent='center'
						alignItems='center'
					>
						{/* carousel */}
						{canScroll && (
							<Box
								sx={{
									color: theme.palette.accentDark
										.contrastText,
								}}
							>
								<IconButton
									disabled={arrowDisabled.left}
									onClick={() => {
										handleScroll({ left: 304 + 5 })
									}}
								>
									<ArrowLeft
										sx={{
											transform: 'scale(2,3)',
										}}
									/>
								</IconButton>
							</Box>
						)}
						<Box
							ref={(el) => {
								setEventScroll(el as HTMLDivElement)
							}}
							sx={{
								position: 'relative',
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-start',
								overflowX: 'auto',
								gap: 5,
								'&::-webkit-scrollbar': {
									display: 'none',
								},
							}}
							onDragStart={() => {
								console.log('dragstart')
							}}
							onDragEnd={() => {
								console.log('dragend')
								setTimeout(() => {
									checkArrows()
								}, 320)
							}}
						>
							{(projects.getUpcoming().length > 0 &&
								projects.getUpcoming().map((project, i) => (
									<Link
										to={`/events/${project.id}`}
										key={i}
									>
										<Button
											sx={{
												transition: 'transform 0.2s',
												'&:hover': {
													transform: 'scale(1.02)',
												},
											}}
										>
											<Box
												width='304px'
												minWidth='304px'
												maxWidth='304px'
												height='205px'
												position='relative'
												borderRadius='28px'
												overflow='hidden'
											>
												<Box
													position='absolute'
													top={0}
													left={0}
													width='100%'
													height='168px'
													sx={{
														backgroundImage: `url(${project.Logo?.path})`,
														backgroundSize:
															'contain',
														backgroundRepeat:
															'no-repeat',
														backgroundPosition:
															'center',
														zIndex: 0,
													}}
												/>
												<Box
													sx={{
														position: 'relative',
														width: '100%',
														height: '100%',
														zIndex: 1,
													}}
												>
													<Box
														display='flex'
														flexDirection='column'
														justifyContent='flex-end'
														alignItems='flex-start'
														gap={1}
														sx={{
															width: 'calc(100% - 32px)',
															height: 'calc(100% - 32px)',
															background: `linear-gradient(0deg, ${project.ProjectTag?.color} 0%, rgba(255, 255, 255, 0) 100%)`,
														}}
														p={4}
													>
														<Typography
															variant='h4'
															textTransform={
																'uppercase'
															}
															fontWeight={'bold'}
															sx={{
																color: theme
																	.palette
																	.accentLight
																	.contrastText,
																// white outer outline
																textShadow:
																	'1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff',
															}}
														>
															{project.name}
														</Typography>
														<Typography
															variant='body1'
															sx={{
																color: theme
																	.palette
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
												</Box>
											</Box>
										</Button>
									</Link>
								))) || (
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<Typography
										variant='h3'
										align='center'
										pt={5}
										sx={{
											color: theme.palette.accentDark
												.contrastText,
										}}
									>
										No events have been scheduled. Stay
										Tuned!
									</Typography>
								</Box>
							)}
						</Box>
						{canScroll && (
							<Box
								sx={{
									color: theme.palette.accentDark
										.contrastText,
								}}
							>
								<IconButton
									disabled={arrowDisabled.right}
									onClick={() => {
										handleScroll({ right: 304 + 5 })
									}}
								>
									<ArrowRight
										sx={{
											transform: 'scale(2,3)',
										}}
									/>
								</IconButton>
							</Box>
						)}
					</Grid2>
				)}
			</Grid2>
		</Box>
	)
}
