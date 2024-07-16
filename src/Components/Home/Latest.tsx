import { ArrowForward, Search } from '@mui/icons-material'
import {
	Box,
	Typography,
	SxProps,
	useTheme,
	Grid,
	Card,
	TextField,
	Button,
	styled,
	OutlinedInputProps,
	TextFieldProps,
	IconButton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faSprayCan,
	faGhost,
	faPenNib,
	faEgg,
	faCamera,
} from '@fortawesome/free-solid-svg-icons'

import GerzyJames from '@/assets/photos/Home/Gerzy_and_Jamez.png'

export default function Latest(props: { sx: SxProps }) {
	const [announcements, setAnnouncements] = useState<
		| {
				id: number
				title: string
				date: Date
				tag: {
					name:
						| 'Fest'
						| 'Graffiti Grab'
						| 'HorrorCon'
						| 'Lenz'
						| 'Ink'
					color: string
				}
		  }[]
		| null
	>(null)

	const theme = useTheme()

	const formatter = new Intl.DateTimeFormat('en', {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric',
	})

	// Fetch latest announcement
	async function FetchLatest() {
		const fakeTakes = [
			{
				name: 'Fest',
				color: `#FC00AD`,
			},
			{
				name: 'Graffiti Grab',
				color: '#FFE400',
			},
			{
				name: 'HorrorCon',
				color: '#F70000',
			},
			{
				name: 'Lenz',
				color: '#00C6FF',
			},
			{
				name: 'Ink',
				color: '#FFFFFF',
			},
		]
		// Fake Fetch
		return new Promise((resolve) => {
			// wait 1 second
			setTimeout(() => {
				const titles = 'Title'
					.repeat(5)
					.split('Title')
					.fill('Title ')
					.slice(1)
				resolve(
					titles.map((title, index) => ({
						title: `${title} ${index}`,
						id: index + 1,
						date: new Date(),
						tag: fakeTakes[index % fakeTakes.length] as {
							name:
								| 'Fest'
								| 'Graffiti Grab'
								| 'HorrorCon'
								| 'Lenz'
								| 'Ink'
							color: string
						},
					}))
				)
			}, 1000)
		}) as Promise<
			{
				id: number
				title: string
				date: Date
				tag: {
					name:
						| 'Fest'
						| 'Graffiti Grab'
						| 'HorrorCon'
						| 'Lenz'
						| 'Ink'
					color: string
				}
			}[]
		>
	}

	useEffect(() => {
		if (!announcements)
			FetchLatest().then((data) => {
				setAnnouncements(data)
			})
	}, [announcements])

	return (
		<Box
			sx={{
				...props.sx,
				my: 4,
			}}
		>
			<Grid
				container
				columnSpacing={{ xs: 0, md: 4 }}
				rowSpacing={{ xs: 4, md: 0 }}
			>
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant='h2'
						textAlign='center'
						sx={{
							textDecoration: 'underline',
						}}
					>
						LATEST BLOG POSTS
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						{announcements &&
							announcements.length > 0 &&
							announcements.map((announcement) => {
								return (
									<Button
										sx={{
											m: 0,
											p: 0,
											borderRadius: '16px !important',
											backgroundColor:
												theme.palette.accentDark.main,
											'&:hover': {
												backgroundColor:
													announcement.tag.color,
												WebkitTextFillColor:
													theme.palette.getContrastText(
														announcement.tag.color
													),
											},
										}}
									>
										<Card
											key={announcement.id}
											sx={{
												flexGrow: 1,
												display: 'flex',
												alignItems: 'center',
												borderRadius: 4,
												backgroundColor: 'transparent',
											}}
										>
											<Box
												sx={{
													width: '100%',
													maxWidth: '65px',
													height: '65px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor:
														announcement.tag.color,
													color: theme.palette.getContrastText(
														announcement.tag.color
													),
												}}
											>
												{(announcement.tag.name ===
													'Fest' && (
													<FontAwesomeIcon
														icon={faSprayCan}
														size='2x'
													/>
												)) ||
													(announcement.tag.name ===
														'Graffiti Grab' && (
														<FontAwesomeIcon
															icon={faEgg}
															size='2x'
														/>
													)) ||
													(announcement.tag.name ===
														'HorrorCon' && (
														<FontAwesomeIcon
															icon={faGhost}
															size='2x'
														/>
													)) ||
													(announcement.tag.name ===
														'Lenz' && (
														<FontAwesomeIcon
															icon={faCamera}
															size='2x'
														/>
													)) ||
													(announcement.tag.name ===
														'Ink' && (
														<FontAwesomeIcon
															icon={faPenNib}
															size='2x'
														/>
													))}
											</Box>
											<Box
												px={2}
												width='100%'
												height='fit-content'
												display='flex'
												flexDirection='column'
												justifyContent='space-evenly'
												alignItems='center'
												gap={1}
											>
												<Typography
													variant='body1'
													sx={{
														width: '100%',
														textAlign: 'left',
													}}
												>
													{formatter.format(
														new Date(
															announcement.date
														)
													)}
												</Typography>
												<Typography
													variant='h5'
													fontWeight='bold'
													sx={{
														width: '100%',
														textAlign: 'left',
													}}
												>
													{announcement.title}
												</Typography>
											</Box>

											<Box>
												<ArrowForward />
											</Box>
										</Card>
									</Button>
								)
							})}
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					sx={{
						gap: 4,
					}}
				>
					<Box
						sx={{
							position: 'relative',
							height: '120px',
							flexGrow: 1,
							borderRadius: 5,
							overflow: 'hidden',
							cursor: 'pointer',
						}}
						onClick={() => {
							window.open('https://shop.projektcommunity.com/')
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								background:
									'linear-gradient(90deg, rgba(0,176,254,1) 0%, rgba(255,228,0,1) 100%)',
							}}
						/>

						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundImage: `url(${GerzyJames})`,
								backgroundSize: '80%',
								backgroundPosition: '-160px -20px',
								backgroundRepeat: 'no-repeat',
							}}
						/>
						<Typography
							textAlign='right'
							variant='h2'
							color={theme.palette.accentLight.contrastText}
							sx={{
								position: 'relative',
								zIndex: 1,
								height: '100%',
								pr: 4,
								fontWeight: 'bold',
								// center vertically
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
							}}
						>
							SHOP OUR <br />
							MERCH
						</Typography>
					</Box>
					<Box
						sx={{
							width: '100%',
							height: 'fit-contents',
						}}
					>
						<Typography
							variant='h2'
							fontWeight='bold'
							textAlign='center'
							sx={{
								textDecoration: 'underline',
							}}
						>
							GROUP SEARCH
						</Typography>
						<Box
							display='flex'
							flexDirection='column'
							justifyContent='center'
							alignItems='center'
							px={16}
							py={8}
							gap={6}
							sx={{
								backgroundColor: theme.palette.accentDark.main,
								color: theme.palette.accentDark.contrastText,
								borderRadius: 5,
							}}
						>
							<CustomTextField
								variant='outlined'
								sx={{
									borderRadius: 5,
									width: '100%',
								}}
								// Search Icon End
								InputProps={{
									endAdornment: (
										<IconButton>
											<Search
												sx={{
													color: theme.palette
														.accentDark
														.contrastText,
												}}
											/>
										</IconButton>
									),
								}}
							/>
							<Button variant='contained'>
								<Typography
									variant='body1'
									fontWeight='bold'
									color={theme.palette.primary.contrastText}
								>
									Search Group
								</Typography>
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}

const CustomTextField = styled((props: TextFieldProps) => (
	<TextField
		InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme.palette.accentLight.main,
		color: theme.palette.accentLight.contrastText,
		WebkitTextFillColor: theme.palette.accentLight.contrastText,
		borderRadius: 25,
	},
	// Label
	'& .MuiInputLabel-root': {
		color: theme.palette.accentLight.contrastText,
	},
	// .MuiSvgIcon-root
	'& .MuiSvgIcon-root': {
		color: theme.palette.accentLight.contrastText,
	},
}))
