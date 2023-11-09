import {
	Box,
	Button,
	IconButton,
	SxProps,
	Typography,
	useTheme,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import GerzyJamez from '@/assets/photos/Home/Gerzy_and_Jamez.png'
import VRChat from '@/assets/photos/Home/Experience in VRChat_White.png'
import { FontAwesomeSVGIcon, Pico, Viveport } from '..'
import { faSteam, faMeta, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

const isFontAwesome = (x: any): x is IconDefinition => {
	return Object.keys(x).includes('prefix')
}

export default (props: { sx: SxProps }) => {
	const downloadLinks: {
		name: string
		url: string
		icon: any
		disabled?: true
	}[] = [
		{
			name: 'Steam',
			url: 'https://store.steampowered.com/app/438100/VRChat/',
			icon: faSteam,
		},
		{
			name: 'Meta',
			url: 'https://www.meta.com/experiences/1856672347794301/',
			icon: faMeta,
		},
		{
			name: 'Viveport',
			url: 'https://www.viveport.com/apps/469fbcbb-bfde-40b5-a7d4-381249d387cd?hl=en-US',
			icon: Viveport,
		},
		{
			name: 'Android [Alpha]',
			url: 'https://play.google.com/store/apps/details?id=com.vrchat.mobile.playstore&hl=en_US&gl=US&pli=1',
			icon: faAndroid,
		},
		{
			name: 'Pico',
			url: 'https://steampowered.com',
			icon: Pico,
			disabled: true,
		},
	]

	const theme = useTheme()

	const bodyFontSize = {
		xs: '1rem',
		sm: '1.5rem',
		md: '2rem',
		lg: '1.75rem',
		xl: '1.75rem',
	}

	const strongFontSize = {
		xs: '1.25rem',
		sm: '1.75rem',
		md: '2.8rem',
		lg: '2rem',
		xl: '2rem',
	}
	return (
		<Box sx={{ ...props.sx }}>
			<Typography
				variant='h2'
				fontFamily={'Norwester'}
				align='center'
				mb={5}
			>
				How can I join?
			</Typography>
			<Grid
				container
				alignItems='center'
				direction='row-reverse'
				sx={{
					flexGrow: 1,
					minHeight: '12em',
				}}
			>
				<Grid
					xl={6}
					lg={12}
					p={4}
				>
					<Box
						component='img'
						src={GerzyJamez}
						sx={{ transform: 'scaleX(-1)' }}
						maxHeight='100%'
						maxWidth={'100%'}
					/>
				</Grid>
				<Grid
					xl={6}
					lg={12}
					sx={{ p: 4 }}
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems={'center'}
				>
					<Box
						component='img'
						src={VRChat}
						maxWidth='100%'
					/>

					<Typography
						variant={'body2'}
						fontFamily='NerdFont'
						align='center'
						maxWidth='20em'
						fontWeight='bold'
						fontSize={bodyFontSize}
						sx={{ mb: 4 }}
					>
						VRChat lets you fully embody custom avatars, play social
						games, and connect with friends in new ways. VRChat
						hosts a massive global community of gamers, musicians,
						creators, artists, entertainers and more.
					</Typography>
					<Typography
						variant={'h4'}
						fontFamily='NerdFont'
						align='center'
						maxWidth='20em'
						fontWeight='bold'
						fontSize={strongFontSize}
						sx={{ mb: 4 }}
					>
						No VR Headset Required
					</Typography>
					<Typography
						variant={'body2'}
						fontFamily='NerdFont'
						align='center'
						maxWidth='20em'
						fontWeight='bold'
						fontSize={bodyFontSize}
						sx={{ mb: 4 }}
					>
						VRChat offers several ways to play.
					</Typography>
					<Grid
						container
						mb={5}
						spacing={5}
						justifyContent='center'
					>
						{downloadLinks.map((link, i) => {
							const Icon = link.icon
							return (
								<Grid key={i}>
									<IconButton
										href={link.url}
										target='_blank'
										sx={{
											backgroundColor:
												theme.palette.info.dark,
											minWidth: '5em',
										}}
										disabled={link.disabled}
									>
										{(isFontAwesome(Icon) && (
											<Box mr={2}>
												<FontAwesomeSVGIcon
													icon={Icon}
												/>
											</Box>
										)) || (
											<Box mr={2}>
												<Icon />
											</Box>
										)}
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'start',
											}}
										>
											<Typography>Download on</Typography>
											<Typography>{link.name}</Typography>
										</Box>
									</IconButton>
								</Grid>
							)
						})}
					</Grid>
					<Typography
						variant={'body2'}
						fontFamily='NerdFont'
						align='center'
						maxWidth='20em'
						fontWeight='bold'
						fontSize={bodyFontSize}
						sx={{ mb: 4 }}
					>
						VRChat is Cross-Platform: Oculus Quest, Oculus Rift,
						SteamVR, and Viveport.
					</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}
