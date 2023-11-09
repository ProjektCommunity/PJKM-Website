import { Box, Typography, Paper, Avatar, Divider } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Axios from 'axios'

export default function Fest() {
	const baseAPI = import.meta.env.VITE_API
	const location = useLocation()

	type Event = {
		date: string
		timeStart: string
		timeEnd: string
		name: string
		marketing: string
		eventType: string
		venue: string
		streamed:
			| {
					isStreamed: false
			  }
			| {
					isStreamed: true
					streamLink: string
			  }
		questCompatible: boolean
	}

	const [fest_events, setFestEvents] = useState<{
		year: string
		mainImg: string
		events: Event[]
		guests: {
			events: {
				name: string
				img?: string
			}[]
			booths: {
				name: string
				img?: string
			}[]
		}
	} | null>(null)

	// array of image urls
	const memories: { src: string; alt: string }[] = [
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123093888647827586/VRChat_2023-06-26_00-16-27.181_7680x4320.png?ex=655c2531&is=6549b031&hm=8560a5cc0d58a8dec0b0ea05fa3d0af43c0b2e90ba12450f6e1fe5e4ca822dbb&=&width=810&height=456',
			alt: '',
		},
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123093908281364550/VRChat_2023-06-26_00-20-04.056_7680x4320.png?ex=655c2535&is=6549b035&hm=51bfe8f6253e718b6053b169b6441bfd4ea0bb19758f90847ded2f3236647ac4&=&width=810&height=456',
			alt: '',
		},
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123092716893524028/VRChat_2023-06-26_00-11-46.716_7680x4320.png?ex=655c2419&is=6549af19&hm=f53e4cd39bdfd9ec7ab5fe0eff6fc26b16f16089e8a81ef07284414247e14afb&=&width=810&height=456',
			alt: '',
		},
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123084302733811722/VRChat_2023-06-25_22-30-35.779_7680x4320.png?ex=655c1c43&is=6549a743&hm=17431eece4d6a1c751dd53b2da25d21ad71fec42c2f0332146c760ac29cb0b42&=&width=1609&height=905',
			alt: '',
		},
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123086421138358434/VRChat_2023-06-25_22-56-28.789_4320x7680.png?ex=655c1e3c&is=6549a93c&hm=fadeb6b70b39fb8aef04b732dc0bf77d3197b40af03a1c0df9f4972bd782bcdf&=&width=1609&height=905',
			alt: '',
		},
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123088856917479454/VRChat_2023-06-25_23-12-50.555_7680x4320.png?ex=655c2081&is=6549ab81&hm=3527f7724ffbb582e038d7cbac6326fb254700d1474352debfcc4c638ccb1864&=&width=1609&height=905',
			alt: '',
		},
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123092011285749891/VRChat_2023-06-25_23-27-14.892_4320x7680.png?ex=655c2371&is=6549ae71&hm=3195cc0f40deab52db72eacefa92506dd1e7b76ea43c3e495e98e7d35d4e5d20&=&width=1609&height=905',
			alt: '',
		},
		{
			src: 'https://media.discordapp.net/attachments/1062035928958369884/1123093910277861396/VRChat_2023-06-26_00-20-53.197_7680x4320.png?ex=655c2536&is=6549b036&hm=80f22f596293ad003ab3281f17e5026b90f3f2f6454b8ad12309d79e36f32cb8&=&width=1609&height=905',
			alt: '',
		},
	]

	const dates = (events: Event[]) => {
		const dates = events.map((event) => event.date)
		const uniqueDates = [...new Set(dates)]
		return uniqueDates
	}

	function getStartDate(event: Event, year: string) {
		var date = event.date
		var time = event.timeStart

		const startDate = new Date(`${date} ${year}`)

		const startHour = time.split(':')[0]
		const startMinute = time.split(':')[1].split(' ')[0]
		const startAMPM = time.split(':')[1].split(' ')[1]
		startDate.setHours(Number(startHour) + (startAMPM === 'PM' ? 12 : 0))
		startDate.setMinutes(Number(startMinute))

		return startDate
	}

	function getEndDate(event: Event, year: string) {
		var date = event.date
		var time = event.timeEnd

		const endDate = new Date(`${date} ${year}`)

		const endHour = time.split(':')[0]
		const endMinute = time.split(':')[1].split(' ')[0]
		const endAMPM = time.split(':')[1].split(' ')[1]

		endDate.setHours(Number(endHour) + (endAMPM === 'PM' ? 12 : 0))
		endDate.setMinutes(Number(endMinute))

		if (endDate < getStartDate(event, year)) {
			endDate.setDate(endDate.getDate() + 1)
		}
		return endDate
	}

	const isEventOver = (event: Event, year: string) => {
		const endDate = getEndDate(event, year)
		const now = new Date()
		return endDate < now
	}

	const loadFestEvents = async () => {
		const params = new URLSearchParams(location.search)
		const year = params.get('year')
		try {
			const response = await Axios.get(
				`${baseAPI}/
			events`,
				{
					params: {
						event: 'fest',
						year,
					},
				}
			)

			console.log(response.data.data.events)

			setFestEvents(response.data.data.events)
		} catch (error) {
			console.log(error)
		}
	}
	const navigate = useNavigate()
	useEffect(() => {
		if (location.search) {
			const params = new URLSearchParams(location.search)
			const year = params.get('year')
			if (year) {
				console.log(baseAPI)
				if (!fest_events) loadFestEvents()
			} else {
				navigate(`${location.pathname}?year=2023`)
			}
		} else {
			navigate(`${location.pathname}?year=2023`)
		}
	})

	// Page that describes the event "Projekt Fest" and includes a calendar of the events in the viewers timezone. All times in the events above are EST
	if (!fest_events) {
		return <></>
	} else {
		return (
			<Box>
				{/* Hero */}
				<Box
					sx={{
						width: '100%',
						height: 'calc(100vh - 8em)',
						backgroundImage: `url(${fest_events.mainImg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'rgba(0,0,0,0.5)',
							backdropFilter: 'blur(5px)',
							p: 5,
							m: 5,
							borderRadius: 12,
						}}
					>
						<Typography
							variant='h1'
							textAlign='center'
							fontFamily='Nerdfont'
						>
							Projekt: Fest {fest_events.year}
						</Typography>
						{isEventOver(
							fest_events.events[fest_events.events.length - 1],
							fest_events.year
						) && (
							<Typography
								variant='h3'
								textAlign='center'
								fontFamily='Nerdfont'
							>
								Thanks for coming! See you next year!
							</Typography>
						)}
					</Box>
				</Box>

				<Divider />

				{/* Page Content */}

				{isEventOver(
					fest_events.events[fest_events.events.length - 1],
					fest_events.year
				) ? (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Grid
							container
							spacing={5}
							sx={{ width: '100%' }}
							p={5}
							flexDirection='row-reverse'
							alignItems='center'
						>
							<Grid
								xl={8}
								lg={12}
								md={12}
								sm={12}
								xs={12}
							>
								<ImageGrid images={memories} />
							</Grid>
							<Grid
								xl={4}
								lg={12}
							>
								<Typography
									variant={'h3'}
									textAlign='center'
								>
									Message from the Projekt Team
								</Typography>
								<Typography
									variant='h4'
									textAlign='center'
									mt={4}
								>
									{/* A lengthy message essentially thanking everyone that joined, and thanking everyone who dedicated a large portion of their time to the projekt */}
									We would like to thank everyone who joined
									us for Projekt: Fest 2023! We hope you had a
									great time and we look forward to seeing you
									next year! We would also like to thank
									everyone who dedicated a large portion of
									their time to the project. Without you, this
									would not have been possible. We hope you
									enjoyed the event and we look forward to
									seeing you next year!
								</Typography>
							</Grid>
						</Grid>

						<Divider
							sx={{
								width: '100%',
								m: 5,
							}}
						/>
						{Object.keys(fest_events.guests).map((key) => (
							<>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography
										variant='h3'
										textAlign='center'
										fontFamily='Nerdfont'
										mb={5}
									>
										{key === 'events'
											? 'Special Thanks to event hosts!'
											: 'Special thanks to these communities'}
									</Typography>
									<Grid
										container
										spacing={5}
										sx={{ width: '100%' }}
										flexDirection='row'
										alignItems='center'
										justifyContent='center'
									>
										{(
											fest_events.guests[key] as {
												name: string
												img?: string
											}[]
										).map((guest, i) => (
											<Grid
												key={i}
												md={4}
											>
												{guest.img && (
													<Avatar
														src={guest.img}
														sx={{
															width: 100,
															height: 100,
														}}
													/>
												)}
												<Typography
													variant='h4'
													fontWeight='bold'
													textAlign='center'
												>
													{guest.name}
												</Typography>
											</Grid>
										))}
									</Grid>
								</Box>
								<Divider
									sx={{
										width: '100%',
										my: 5,
									}}
								/>
							</>
						))}
					</Box>
				) : (
					<>
						<Typography
							variant='h1'
							color='initial'
						>
							Test
						</Typography>
					</>
				)}
			</Box>
		)
	}
}

const ImageGrid = (props: { images: { src: string; alt: string }[] }) => {
	const { images } = props
	const [currentImage, setCurrentImage] = useState(0)
	const aspectRatio = 16 / 9

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((currentImage) =>
				currentImage === images.length - 1 ? 0 : currentImage + 1
			)
		}, 5000)
		return () => clearInterval(interval)
	})
	return (
		<>
			{/* A single box that fades between the given images */}
			<Paper
				elevation={12}
				sx={{
					aspectRatio: `${aspectRatio}`,
					width: '100%',
					position: 'relative',
					overflow: 'hidden',
					borderRadius: 5,
				}}
			>
				{images.map((image, index) => (
					<Box
						key={index}
						sx={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							top: 0,
							left: 0,
							opacity: currentImage === index ? 1 : 0,
							transition: 'opacity 5s ease-in-out',
							backgroundImage: `url('${image.src}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
					/>
				))}
			</Paper>
		</>
	)
}
