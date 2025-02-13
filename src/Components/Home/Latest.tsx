import { ArrowForward, Search } from '@mui/icons-material'
import * as API from '@/utils/API'
import { Box, Typography, SxProps, useTheme, Grid, Card, TextField, Button, styled, OutlinedInputProps, TextFieldProps, IconButton, Grid2 } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan, faGhost, faPenNib, faEgg, faCamera } from '@fortawesome/free-solid-svg-icons'

import { PjktIcons } from '@/views/Public/Blogs/BlogPosts'

import GerzyJames from '@/assets/photos/Home/Gerzy_and_Jamez.png'
import { BoxProps } from '.'

export default function Latest(props?: BoxProps) {
	const [announcements, setAnnouncements] = useState<API.Blog[] | null>(null)

	const theme = useTheme()

	const formatter = new Intl.DateTimeFormat('en', {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric',
	})

	// Fetch latest announcement
	async function FetchLatest() {
		return API.getBlogs({ limit: 5 }) as Promise<API.BlogsResponse>
	}

	useEffect(() => {
		if (!announcements)
			FetchLatest().then((data) => {
				setAnnouncements(data.blogs)
			})
	}, [announcements])

	return (
		<Box {...props}>
			<Grid2
				container
				columnSpacing={{ xs: 0, md: 4 }}
				rowSpacing={{ xs: 4, md: 0 }}
			>
				<Grid2
					size={{ xs: 12, md: 6 }}
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
									<Link
										to={`/blog/${announcement.id}`}
										key={announcement.id}
									>
										<Button
											key={announcement.id}
											fullWidth
											sx={{
												m: 0,
												p: 0,
												borderRadius: '16px !important',
												backgroundColor: theme.palette.accentDark.main,
												'&:hover': {
													backgroundColor: announcement.ProjectTag?.color,
													WebkitTextFillColor: theme.palette.getContrastText(announcement.ProjectTag?.color || theme.palette.accentDark.main),
												},
											}}
										>
											<Card
												key={announcement.id}
												sx={{
													width: '100%',
													display: 'flex',
													borderRadius: 4,
													backgroundColor: 'transparent',
												}}
											>
												<Box
													sx={{
														flexGrow: 1,
														width: '80px',
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														backgroundColor: announcement.ProjectTag?.color,
														color: theme.palette.getContrastText(announcement.ProjectTag?.color || theme.palette.accentDark.main),
													}}
												>
													<FontAwesomeIcon
														icon={(announcement.ProjectTag && PjktIcons[announcement.ProjectTag.name]) || PjktIcons.Other}
														size='2x'
													/>
												</Box>
												<Box
													px={2}
													width='100%'
													display='flex'
													flexDirection='column'
													justifyContent='space-evenly'
													alignItems='left'
													gap={1}
												>
													<Typography
														variant='body1'
														sx={{
															maxWidth: '100%',
															width: 'fit-content',
															textAlign: 'left',
														}}
													>
														{formatter.format(new Date(announcement.createdAt))}
													</Typography>
													<Box
														width='100%'
														height='100%'
													>
														<Typography
															textAlign='left'
															variant='h5'
															sx={{
																textDecoration: 'underline',
															}}
														>
															{announcement.title}
														</Typography>
													</Box>
												</Box>

												<Box
													width='fit-content'
													height='100%'
													display='flex'
													alignItems='center'
												>
													<ArrowForward />
												</Box>
											</Card>
										</Button>
									</Link>
								)
							})}
					</Box>
				</Grid2>
				<Grid2
					size={{ xs: 12, md: 6 }}
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
								background: 'linear-gradient(90deg, rgba(0,176,254,1) 0%, rgba(255,228,0,1) 100%)',
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
													color: theme.palette.accentDark.contrastText,
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
				</Grid2>
			</Grid2>
		</Box>
	)
}

const CustomTextField = styled((props: TextFieldProps) => (
	<TextField
		slotProps={{
			input: {
				disableUnderline: true,
			},
		}}
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
