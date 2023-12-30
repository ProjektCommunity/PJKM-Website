import {
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom'
import { EventList } from '@/Components/eventList'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	AppBar,
	Box,
	Button,
	IconButton,
	Tab,
	Tabs,
	Typography,
} from '@mui/material'

import PJKTLarge from '@/assets/PJKT-01.png'
import {
	KeyboardArrowUp as Up,
	KeyboardArrowDown as Down,
	KeyboardArrowLeft as Left,
	KeyboardArrowRight as Right,
	ExpandMore as ExpandMoreIcon,
	CalendarMonth as CalendarMonthIcon,
	Toys,
} from '@mui/icons-material'
import ReactPlayer from 'react-player'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, {
	Fragment,
	ReactNode,
	SyntheticEvent,
	useCallback,
	useEffect,
	useReducer,
	useState,
} from 'react'
import { SxProps, useTheme } from '@mui/material/styles'
import * as API from '@/utils/API'

interface LoadedEventList extends EventList {
	loaded: {
		year: number
		project: API.Project
	}
}

//#region Reducer
interface uninitializedState {
	initialized: false
}

interface initializedState {
	initialized: true
	eventList: LoadedEventList
}

const initState: uninitializedState | initializedState = {
	initialized: false,
}

const enum REDUCER_ACTION_TYPE {
	INITIALIZE,
	REJECT_INIT,
	SET_EVENTLIST,
	SET_YEAR,
	SET_PROJECT,
}

type ReducerAction = {
	type: REDUCER_ACTION_TYPE
	eventList?: LoadedEventList
	yearSelected?: number
	project?: API.Project
}
//#endregion

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

//#region TabPanel
function allyProps(index: number) {
	return {
		id: `simple-tab${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

interface TabPanelProps {
	children?: ReactNode
	dir?: string
	index: number
	value: number
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}
//#endregion

function Event() {
	const theme = useTheme()
	const navigate = useNavigate()
	const location = useLocation()
	const params = useParams()
	const reducer = (
		state: typeof initState,
		action: ReducerAction
	): typeof initState => {
		if (state.initialized) {
			switch (action.type) {
				case REDUCER_ACTION_TYPE.SET_EVENTLIST:
					if (action.eventList)
						return { ...state, eventList: action.eventList }
					return { ...state }
				case REDUCER_ACTION_TYPE.SET_PROJECT:
					if (action.project) {
						state.eventList.setProject(action.project)
						navigate(action.project.route.toLowerCase())
					}
					return { ...state }
				case REDUCER_ACTION_TYPE.SET_YEAR:
					if (action.yearSelected) {
						state.eventList.setYear(action.yearSelected)
						navigate(
							state.eventList.loaded.project.route.toLowerCase()
						)
					}
					return { ...state }
				default:
					return { ...state }
			}
		} else {
			switch (action.type) {
				case REDUCER_ACTION_TYPE.INITIALIZE:
					if (
						action.eventList &&
						action.yearSelected &&
						action.eventList &&
						action.project
					) {
						const eventList = action.eventList
						eventList.setLoaded(action.yearSelected, action.project)
						return {
							initialized: true,
							eventList: action.eventList,
						}
					}
					throw new Error(
						'Initializing requires eventList, yearSelected, and project to be completed'
					)
				case REDUCER_ACTION_TYPE.REJECT_INIT:
					navigate('/events')
					return { ...state }
				default:
					throw new Error(
						'Initializing requires eventList, yearSelected, and project to be completed'
					)
			}
		}
	}
	const [state, dispatch] = useReducer(reducer, initState)

	useEffect(() => {
		const initialize = async () => {
			const eventList = new EventList(
				await API.getProjects()
			) as LoadedEventList
			if (!eventList.getListOfYears().includes(Number(params.year))) {
				dispatch({
					type: REDUCER_ACTION_TYPE.REJECT_INIT,
				})
				return
			}
			dispatch({
				type: REDUCER_ACTION_TYPE.INITIALIZE,
				eventList,
				yearSelected: Number(params.year),
				project: eventList.getProjectByRoute(
					location.pathname.toLowerCase()
				),
			})
		}
		if (!state.initialized) {
			initialize()
		}
	}, [state, dispatch])

	return (
		<>
			{state.initialized && (
				<Initialized
					state={state}
					dispatch={dispatch}
				/>
			)}
		</>
	)
}

function Initialized(props: {
	state: initializedState
	dispatch: React.Dispatch<ReducerAction>
}) {
	const { state, dispatch } = props

	const handleYearChange: (
		event: React.SyntheticEvent,
		newValue: number
	) => void = (_, newValue) => {
		dispatch({ type: REDUCER_ACTION_TYPE.SET_YEAR, yearSelected: newValue })
	}

	const handleProjectChange: (newValue: string) => void = (newValue) => {
		if (state.initialized) {
			const project = state.eventList.getProjectByYearAndName(
				state.eventList.loaded.year,
				newValue
			)
			if (project) {
				dispatch({
					type: REDUCER_ACTION_TYPE.SET_PROJECT,
					project,
				})
			}
		}
	}

	const videoDimensions = {
		width: 'calc(50vw)',
		height: 'calc(50vw * 9 / 16)',
	}

	const sameMonth =
		state.eventList.loaded.project.startDate.getMonth() ===
		state.eventList.loaded.project.endDate.getMonth()
	const dateString = `${
		months[
			(state.eventList.loaded.project as API.Project).startDate.getMonth()
		]
	} ${state.eventList.loaded.project?.startDate.getDate()} - ${
		sameMonth
			? state.eventList.loaded.project?.endDate.getDate()
			: months[state.eventList.loaded.project.endDate.getMonth()] +
			  ' ' +
			  state.eventList.loaded.project?.endDate.getDate()
	}`

	const VidPlayer = () => new VideoPlayer({ state, dispatch }).render()

	return (
		<Box
			width='70%'
			mx='auto'
		>
			{state.initialized && (
				<>
					<AppBar
						position='static'
						sx={{
							width: '50%',
							mx: 'auto',
							mt: 5,
						}}
					>
						<Tabs
							value={state.eventList.loaded.year}
							onChange={handleYearChange}
							indicatorColor='secondary'
							textColor='inherit'
							variant='fullWidth'
						>
							{state.eventList.getListOfYears().map((year, i) => (
								<Tab
									key={year}
									label={year}
									value={year}
									{...allyProps(i)}
								/>
							))}
						</Tabs>
					</AppBar>
					<AppBar
						position='static'
						sx={{
							width: '50%',
							mx: 'auto',
							mb: 5,
						}}
					>
						<Tabs
							variant='fullWidth'
							value={state.eventList.loaded.project.name}
							indicatorColor='secondary'
							textColor='inherit'
						>
							{state.eventList.getProjects().map((project, p) => (
								<Tab
									key={p}
									label={project.name}
									value={project.name}
									onClick={() => {
										handleProjectChange(project.name)
									}}
								/>
							))}
						</Tabs>
					</AppBar>

					<Typography
						variant='h3'
						fontFamily='Norwester'
						textAlign='center'
						mb={2}
					>
						Projekt: {state.eventList.loaded.project.name}
					</Typography>
					<Typography
						variant='h4'
						fontWeight='bold'
						textAlign='center'
						mb={2}
					>
						{dateString}
					</Typography>
					{state.eventList.loaded.project.videoUrl && (
						<VideoPlayer
							state={state}
							dispatch={dispatch}
						/>
					)}

					{state.eventList.loaded.project && (
						<EventPage
							state={state}
							dispatch={dispatch}
						/>
					)}
					{/* <Typography whiteSpace='pre-wrap'>
							{JSON.stringify(state, null, 4)}
						</Typography> */}
				</>
			)}
		</Box>
	)
}

interface PlayerWrapper extends ReactPlayer {
	wrapper: HTMLDivElement
}

class VideoPlayer extends React.Component<
	{
		state: initializedState
		dispatch: React.Dispatch<ReducerAction>
	},
	{
		videoIndex: number
		height: number
		isFullWidth: boolean
		autoPlay: boolean
	}
> {
	videoPlayer: React.RefObject<PlayerWrapper>
	gridRef: React.RefObject<HTMLDivElement>
	constructor(props: {
		state: initializedState
		dispatch: React.Dispatch<ReducerAction>
	}) {
		super(props)
		this.state = {
			videoIndex: 0,
			height: 0,
			isFullWidth: false,
			autoPlay: false,
		}
		this.videoPlayer = React.createRef()
		this.gridRef = React.createRef()
	}

	componentDidMount = () => {
		const minWidth = 900
		if (this.videoPlayer.current === null || this.gridRef.current === null)
			return
		this.setState({
			...this.state,
			height: this.videoPlayer.current.wrapper.getBoundingClientRect()
				.height,
			isFullWidth: window.innerWidth < minWidth,
		})
		window.addEventListener('resize', () => {
			if (this.videoPlayer.current === null) return
			this.setState({
				...this.state,
				height: this.videoPlayer.current.wrapper.getBoundingClientRect()
					.height,
				isFullWidth: window.innerWidth < minWidth,
			})
		})
	}

	render() {
		const videoDimensions = {
			width: 'calc(50vw)',
			height: 'calc(50vw * 9 / 16)',
		}
		const setVideoIndex = (index: number) => {
			this.setState({ ...this.state, videoIndex: index })
		}
		if (this.props.state.eventList.loaded.project.videoUrl === undefined)
			return <></>
		if (
			typeof this.props.state.eventList.loaded.project.videoUrl ===
			'string'
		) {
			return (
				<ReactPlayer
					url={this.props.state.eventList.loaded.project.videoUrl}
					playing={true}
					light
					onReady={() => {}}
					width={videoDimensions.width}
					height={videoDimensions.height}
					style={{
						border: '4px solid black',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				/>
			)
		}
		const urls = this.props.state.eventList.loaded.project.videoUrl
		const onVideoEnd = () => {
			if (this.state.videoIndex === urls.length - 1) {
				setVideoIndex(0)
			} else {
				setVideoIndex(this.state.videoIndex + 1)
				this.setState({ ...this.state, autoPlay: true })
			}
		}

		const monoColor = '225, 225, 225'
		const scrollFilter = {
			'&::before': {
				content: '""',
				position: 'absolute',
				top: 0,
				right: 5,
				width: '16.5%',
				height: '10%',
				background: `linear-gradient(180deg, rgba(${monoColor},0.45) 0%, rgba(${monoColor},0) 100%)`,
				zIndex: 1,
				pointerEvents: 'none',
			},
			'&::after': {
				content: '""',
				position: 'absolute',
				bottom: 0,
				right: 5,
				width: '16.5%',
				height: '10%',
				background: `linear-gradient(0deg, rgba(${monoColor},0.45) 0%, rgba(${monoColor},0) 100%)`,
				zIndex: 1,
				pointerEvents: 'none',
			},
		} as SxProps
		return (
			<Grid2
				container
				justifyContent='center'
				position='relative'
			>
				<Grid2
					md={10}
					xs={12}
					ref={this.gridRef}
				>
					<ReactPlayer
						ref={this.videoPlayer}
						url={urls[this.state.videoIndex]}
						playing={this.state.autoPlay}
						onEnded={onVideoEnd}
						onReady={() => {
							this.setState({ ...this.state, autoPlay: true })
						}}
						width={videoDimensions.width}
						height={videoDimensions.height}
						style={{
							border: '4px solid black',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					/>
				</Grid2>

				<Grid2
					xs={6}
					md={2}
					overflow='auto'
					ref={this.gridRef}
					sx={{
						'&::-webkit-scrollbar': {
							width: '0.4em',
						},
						'&::-webkit-scrollbar-track': {
							boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
							webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'rgba(0,0,0,.1)',
							outline: '1px solid slategrey',
						},
						...(this.gridRef.current &&
							!this.state.isFullWidth &&
							// if mode is scroll
							this.gridRef.current.scrollHeight >
								this.state.height &&
							scrollFilter),
					}}
					height={this.state.height}
					display={this.state.isFullWidth ? 'inherit' : 'block'}
				>
					{urls.map((url, i) => (
						<Box
							width='100%'
							mb={1}
						>
							<Box
								key={i}
								sx={{
									backgroundImage: `url(https://img.youtube.com/vi/${
										url.split('=')[1]
									}/0.jpg)`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
									width: '100%',
									aspectRatio: '16 / 9',
									cursor: 'pointer',
								}}
								onClick={(el) => {
									setVideoIndex(i)
									el.currentTarget.scrollIntoView({
										behavior: 'smooth',
										block: 'nearest',
										inline: 'start',
									})
								}}
							/>

							<Thumbnail url={url} />
						</Box>
					))}
				</Grid2>
			</Grid2>
		)
	}
}

function Thumbnail(props: { url: string }) {
	const { url } = props
	const [title, setTitle] = useState('')
	async function GetVideoURL(url: string): Promise<string> {
		let title = ''
		await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
			.then((res) => res.json())
			.then((data) => {
				title = data.title
			})

		return title
	}

	useEffect(() => {
		GetVideoURL(props.url).then((res) => {
			setTitle(res)
		})
	}, [url, title, setTitle])

	return (
		<Typography
			fontFamily='Norwester'
			sx={{
				textShadow: '0px 20px 20px black',
				textBorder: '3px solid black',
				textAlign: 'center',
			}}
		>
			{title}
		</Typography>
	)
}

function EventPage(props: {
	state: initializedState
	dispatch: React.Dispatch<ReducerAction>
}) {
	const { state, dispatch } = props
	switch (state.eventList.ProjectType()) {
		case 'Festival':
			return (
				<EventFestival
					state={state}
					dispatch={dispatch}
				/>
			)
		case 'Easter Hunt':
			return (
				<EventEaster
					state={state}
					dispatch={dispatch}
				/>
			)
		default: {
			return <></>
		}
	}
}

function EventFestival(props: {
	state: initializedState
	dispatch: React.Dispatch<ReducerAction>
}) {
	const { state, dispatch } = props

	//events
	const dates = Array.from(
		new Set(
			(state.eventList.loaded.project.events as API.event[]).map(
				(event) =>
					`${
						months[event.startDate.getMonth()]
					} ${event.startDate.getDate()}, ${event.startDate.getFullYear()}`
			)
		)
	)
	const [date, setDate] = useState(
		new Date().getTime() > state.eventList.loaded.project.endDate.getTime()
			? 0
			: dates.findIndex(
					(date) =>
						new Date().getTime() < new Date(date).getTime() &&
						new Date().getTime() > new Date(date).setHours(24)
			  )
	)
	const [expanded, setExpanded] = useState<string | false>(false)
	const handleChange =
		(panel: string) => (event?: SyntheticEvent, isExpanded?: boolean) => {
			setExpanded(isExpanded ? panel : false)
		}

	function dateForward() {
		handleChange('')(undefined, false)
		switch (date) {
			case dates.length - 1:
				setDate(0)
				break
			default:
				setDate(date + 1)
				break
		}
	}
	function dateBackward() {
		switch (date) {
			case 0:
				setDate(dates.length - 1)
				break
			default:
				setDate(date - 1)
				break
		}
	}

	return (
		<Fragment>
			<Grid2
				container
				width='100%'
				padding={2}
				my={2}
			>
				<Grid2
					sm={2}
					xs={4}
				>
					<Button
						variant='contained'
						disabled={date === 0}
						sx={{ width: '100%' }}
						onClick={dateBackward}
					>
						<Left />
					</Button>
				</Grid2>
				<Grid2
					md={8}
					xs={4}
				>
					<Typography
						textAlign='center'
						fontFamily='Norwester'
						variant='h4'
					>
						{dates[date]}
					</Typography>
				</Grid2>
				<Grid2
					md={2}
					xs={4}
				>
					<Button
						variant='contained'
						disabled={date === dates.length - 1}
						onClick={dateForward}
						sx={{ width: '100%' }}
					>
						<Right />
					</Button>
				</Grid2>
			</Grid2>
			<Box>
				<Typography>
					All events shown in{' '}
					{new Date(state.eventList.loaded.project?.startDate)
						.toLocaleDateString(undefined, {
							day: '2-digit',
							timeZoneName: 'long',
						})
						.substring(4)}
				</Typography>
				{state.eventList.loaded.project?.events
					?.filter(
						(event) =>
							event.startDate > new Date(dates[date]) &&
							event.startDate <
								new Date(new Date(dates[date]).setHours(24))
					)
					.map((event, i) => {
						const startDateString = `${
							months[event.startDate.getMonth()]
						} ${event.startDate.getDate()}, ${event.startDate.getFullYear()}`
						const endDateString = `${
							months[event.endDate.getMonth()]
						} ${event.endDate.getDate()}, ${event.endDate.getFullYear()}`
						const theme = useTheme()
						const eventOver =
							new Date().getTime() > event.endDate.getTime()

						return (
							<Accordion
								key={i}
								expanded={expanded === `panel${i}`}
								onChange={handleChange(`panel${i}`)}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									sx={{
										color: eventOver
											? theme.palette.grey[500]
											: 'inherit',
									}} //
								>
									<CalendarMonthIcon sx={{ mr: 5 }} />
									{eventOver && (
										<Typography sx={{ mr: 2 }}>
											(Event concluded)
										</Typography>
									)}
									<Typography>{event.event}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography
										variant='h2'
										textAlign='center'
										sx={{ mb: 4 }}
									>
										{event.event}
									</Typography>
									<Typography
										variant='h5'
										textAlign='center'
									>
										{event.startDate.toLocaleTimeString(
											navigator.language,
											{
												hour: 'numeric',
												minute: 'numeric',
												hour12: true,
											}
										)}{' '}
										to{' '}
										{event.endDate.toLocaleTimeString(
											navigator.language,
											{
												hour: 'numeric',
												minute: 'numeric',
												hour12: true,
											}
										)}{' '}
										{event.endDate
											.toLocaleDateString(undefined, {
												day: '2-digit',
												timeZoneName: 'long',
											})
											.substring(4)}
									</Typography>
									<Typography
										variant='h5'
										textAlign='center'
									>
										{event.eventType}
									</Typography>
									{event.quest != undefined && (
										<Typography
											textAlign='center'
											variant='h5'
										>
											This event{' '}
											<span
												style={{
													textDecoration: 'underline',
												}}
											>
												IS
												{event.quest == false && ' NOT'}
											</span>{' '}
											quest compatible.
										</Typography>
									)}
									<Typography
										textAlign='center'
										variant='h5'
									>
										How to Join:{' '}
										<Box
											component='a'
											href='https://vrc.group/PJKT.3741'
											target='_blank'
											sx={{
												textDecoration: 'underline',
											}}
										>
											Join the PJKT:COM Group on VRChat
										</Box>
									</Typography>
									{event.streamed && (
										<Typography
											textAlign='center'
											variant='h6'
											sx={{ mt: 4 }}
										>
											Want to watch it live? Watch it{' '}
											<Box
												component='a'
												href={
													(event.streamLink !==
														'PJKT' &&
														event.streamLink) ||
													'https://twitch.tv/projectcommunity'
												}
												target='_blank'
												sx={{
													textDecoration: 'underline',
												}}
											>
												HERE
											</Box>
										</Typography>
									)}
									<Grid2
										container
										alignItems='center'
										justifyContent='center'
										spacing={8}
										padding={2}
									>
										<Grid2 md={4}>
											<Box
												mx='auto'
												sx={{
													filter: eventOver
														? 'grayScale(1)'
														: 'none',
												}}
											>
												{(event.image && (
													<Box
														my={5}
														mx='auto'
														component='img'
														sx={{
															width: '100%',
														}}
														src={event.image}
													/>
												)) || (
													<Box
														mx='auto'
														component='img'
														src={PJKTLarge}
														sx={{
															width: '100%',
														}}
													/>
												)}
											</Box>
										</Grid2>
										{event.Description && (
											<Grid2 md={8}>
												<Typography
													variant='h5'
													textAlign='left'
												>
													{event.Description}
												</Typography>
											</Grid2>
										)}
									</Grid2>
								</AccordionDetails>
							</Accordion>
						)
					})}
			</Box>
		</Fragment>
	)
}

function EventEaster(props: {
	state: initializedState
	dispatch: React.Dispatch<ReducerAction>
}) {
	const { state, dispatch } = props
	const [height, setHeight] = useState<number | string>('2000')

	const { EasterHunt } = state.eventList.loaded.project

	let loadCounter = 0
	const loaded: React.ReactEventHandler<HTMLIFrameElement> = (event) => {
		console.log(event.currentTarget.height)
	}

	return (
		<>
			<Typography
				variant='h6'
				fontFamily='Norwester'
				mt={5}
			>
				{EasterHunt?.description}
			</Typography>
			<Box
				display='flex'
				flexDirection='column'
				my={5}
			>
				<Typography
					variant='h5'
					textAlign='center'
				>
					Worlds included in this years Graffiti Grab:
				</Typography>
				<Typography
					variant='h6'
					textAlign='center'
				>
					{EasterHunt?.worlds.map((world, i) => (
						<>
							<a
								href={world.link}
								target='_blank'
							>
								{world.name}
							</a>
							{i < EasterHunt.worlds.length - 1 && ', '}
						</>
					))}
				</Typography>
			</Box>
			{EasterHunt?.raffle && (
				<Box
					display='flex'
					flexDirection='column'
					my={5}
				>
					<Box>
						{(EasterHunt.raffle.winners && (
							<Typography
								variant='h5'
								textAlign='center'
							>
								This years Raffle Winners:{' '}
								{EasterHunt.raffle.winners.join(', ')}
							</Typography>
						)) || (
							<>
								<Typography
									variant='h6'
									textAlign='center'
								>
									{EasterHunt.raffle.description}
								</Typography>
								<iframe
									src={EasterHunt.raffle.raffleLink}
									width='100%'
									height={height}
									onLoad={loaded}
									frameBorder='0'
								></iframe>
							</>
						)}
					</Box>
				</Box>
			)}
		</>
	)
}

export default Event
