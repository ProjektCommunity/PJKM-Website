import {
	Box,
	Button,
	Grid,
	IconButton,
	SxProps,
	Typography,
	useTheme,
} from '@mui/material'
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
			name: 'Android [Beta]',
			url: 'https://play.google.com/store/apps/details?id=com.vrchat.mobile.playstore&hl=en_US',
			icon: faAndroid,
		},
		{
			name: 'Pico',
			url: 'https://store-global.picoxr.com/global/detail/1/7288745304105664518',
			icon: Pico,
		},
	]

	const theme = useTheme()

	return (
		<Box
			sx={{
				...props.sx,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 4,
			}}
		>
			<Grid container spacing={2}>
				<Grid
					xs={12}
					lg={6}
					item
					sx={{
						display: 'flex',
					}}
				>
					<Box
						component='img'
						src={VRChat}
						alt='Experience in VRChat'
						sx={{
							width: '100%',
							height: '100%',
							cursor: 'pointer',
						}}
						onClick={() => {
							window.open('https://hello.vrchat.com/')
						}}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					lg={6}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography
						textAlign='right'
						variant='h2'
						sx={{
							fontWeight: 'bold',
							textDecoration: 'underline',
							textAlign: { xs: 'center', lg: 'right' },
							width: '100%',
						}}
					>
						HOW CAN I JOIN?
					</Typography>
					<Typography
						sx={{
							width: '100%',
							textAlign: { xs: 'center', lg: 'right' },
						}}
					>
						<span>VRChat</span> lets you fully embody custom
						avatars, play social games, and connect with friends in
						new ways. VRChat hosts a massive global community of
						gamers, musicians, creators, artists, entertainers and
						more
					</Typography>
					<Typography
						variant='h3'
						sx={{
							width: '100%',
							textAlign: { xs: 'center', lg: 'right' },
						}}
					>
						* VR Not Required
					</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={4}
				pb={2}
			>
				{downloadLinks.map((link) => {
					const Icon = link.icon
					return (
						<Grid
							item
							key={link.name}
							xs={12}
							md={6}
							lg={4}
							xl={12 / downloadLinks.length}
						>
							<Button
								href={link.url}
								target='_blank'
								fullWidth
								sx={{
									backgroundColor:
										theme.palette.accentLight.main,
									minWidth: '5em',
									color: theme.palette.accentLight
										.contrastText,
								}}
								startIcon={
									isFontAwesome(Icon) ? (
										<FontAwesomeSVGIcon icon={Icon} />
									) : (
										<Icon />
									)
								}
							>
								<Typography
									variant='caption'
									color={
										theme.palette.accentLight.contrastText
									}
								>
									{link.name}
								</Typography>
							</Button>
						</Grid>
					)
				})}
			</Grid>
		</Box>
	)
}
