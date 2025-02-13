import { EventList } from '@/Components/eventList'
import { ArrowBack, ArrowForward, ArrowLeft, ArrowRight } from '@mui/icons-material'
import { Box, Button, Divider, Grid2, IconButton, SxProps, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

import * as API from '@/utils/API'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEgg, faGhost, faPenNib, faSprayCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function UpcomingEvents(props?: {} & { sx: SxProps }) {
	const theme = useTheme()
	const [projects, setProjects] = useState<EventList>(new EventList([]))

	useEffect(() => {
		const getEvents = async () => {
			const projectList = new EventList(await API.getProjects())
			setProjects(projectList)
		}
		if (projects.list.length === 0) getEvents()
	}, [projects])
	return (
		<Box
			flexGrow={1}
			display='flex'
			flexDirection='column'
			sx={{ ...props?.sx }}
		>
			<Box
				sx={{
					position: 'relative',
				}}
			>
				<Typography
					variant='h1'
					textAlign='left'
					sx={{
						textDecoration: 'underline',
					}}
				>
					Past Events
				</Typography>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						right: 0,
						transform: 'translate(0, -50%)',
					}}
				>
					<Link to='/events'>
						<Button
							variant='text'
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<Typography
								variant='body1'
								sx={{
									textDecoration: 'underline',
								}}
							>
								Upcomming Events
							</Typography>
							<ArrowForward color='action' />
						</Button>
					</Link>
				</Box>
			</Box>
			<Box
				display='flex'
				flexDirection='column'
				gap={4}
				flexGrow={1}
				py={12}
				mb={12}
				borderRadius={12}
				sx={{
					background: theme.palette.background.paper,
					overflowY: 'auto',
					overflowX: 'hidden',
				}}
			>
				{projects.getPast().map((year, i) => (
					<>
						<YearRow
							key={i}
							year={year.year}
							projects={year.projects}
						/>
						{i !== projects.getPast().length - 1 && (
							<Divider
								sx={{
									my: 4,
								}}
							/>
						)}
					</>
				))}
			</Box>
		</Box>
	)
}

function YearRow(props: { year: number; projects: API.Project[] }) {
	const { year, projects } = props
	const theme = useTheme()

	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

	const [arrowDisabled, setArrowDisabled] = useState({
		left: true,
		right: false,
	})
	const [canScroll, setCanScroll] = useState(false)
	const [eventScroll, setEventScroll] = useState<HTMLDivElement | null>(null)

	function checkArrows() {
		if (!eventScroll) return
		// console.log(`${eventScroll.scrollWidth} >= ${eventScroll.clientWidth}: ${eventScroll.scrollWidth >= eventScroll.clientWidth}`)
		if (eventScroll.scrollWidth >= eventScroll.clientWidth) setCanScroll(true)
		else setCanScroll(false)

		setArrowDisabled({
			left: eventScroll.scrollLeft === 0,
			right: eventScroll.scrollLeft === eventScroll.scrollWidth - eventScroll.clientWidth,
		})
	}

	function handleScroll(config: { left: number }): void
	function handleScroll(config: { right: number }): void
	function handleScroll(config: { left?: number; right?: number }) {
		// console.log(config)
		const { left, right } = config
		const el = eventScroll
		if (!el) return
		el.scrollTo({
			left: el.scrollLeft + (left ? -left : right ? right : 0),
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		if (!eventScroll) return
		eventScroll.addEventListener('scroll', checkArrows)
		window.addEventListener('resize', () => {
			if (!eventScroll) return
			if (eventScroll.scrollWidth > eventScroll.offsetWidth) setCanScroll(true)
			else setCanScroll(false)
		})
		if (!eventScroll) return
		if (eventScroll.scrollWidth > eventScroll.offsetWidth) setCanScroll(true)
		else setCanScroll(false)
		return () => {
			eventScroll.removeEventListener('scroll', checkArrows)
			window.removeEventListener('resize', () => {
				if (!eventScroll) return
				if (eventScroll.scrollWidth > eventScroll.offsetWidth) setCanScroll(true)
				else setCanScroll(false)
			})
		}
	}, [eventScroll, canScroll])

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
			}}
		>
			<Typography
				variant='h2'
				px={10}
				sx={{
					textDecoration: 'underline',
				}}
			>
				{year}
			</Typography>
			<Box>
				{projects.length > 0 && (
					<Grid2
						sx={{ flexGrow: 1 }}
						display='flex'
						flexDirection={'row'}
						justifyContent='center'
						alignItems='center'
					>
						{canScroll && (
							<Box
							width={40}
								sx={{
									color: theme.palette.accentDark.contrastText,
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
							px={canScroll ? 0 : 10}
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
							onDragStart={() => {}}
							onDragEnd={() => {
								setTimeout(() => {
									checkArrows()
								}, 320)
							}}
						>
							{projects.map((project) => (
								<Link
									to={`/events/${project.id}`}
									key={project.id}
								>
									<Button
										sx={{
											p: 0,
											transition: 'transform 0.2s',
											'&:hover': {
												transform: 'scale(0.98)',
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
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
													backgroundPosition: 'center',
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
														textTransform={'uppercase'}
														fontWeight={'bold'}
														sx={{
															color: theme.palette.accentLight.contrastText,
															// white outer outline
															textShadow: '1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff',
														}}
													>
														{project.name}
													</Typography>
													<Typography
														variant='body1'
														sx={{
															color: theme.palette.accentLight.contrastText,
														}}
													>
														{formatter.format(project.start_date)} - {formatter.format(project.end_date)}
													</Typography>
												</Box>
											</Box>
										</Box>
									</Button>
								</Link>
							))}
						</Box>
						{canScroll && (
							<Box
								width={40}
								sx={{
									color: theme.palette.accentDark.contrastText,
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
			</Box>
		</Box>
	)
}
