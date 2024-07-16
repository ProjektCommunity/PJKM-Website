import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	drawerClasses,
	IconButton,
	Typography,
	styled,
	Paper,
	useTheme,
} from '@mui/material'
import { Close, Menu as MenuIcon } from '@mui/icons-material'
import PJKTFull from '@/assets/PJKT-01.png'
import { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import background from '@/assets/photos/Home/Background.png'
import { Footer } from './Footer'
const initState: {
	NavOpen: boolean
	headerHeight: number
	footerHeight: number | null
	storedRoute: string
} = {
	NavOpen: false,
	headerHeight: 90,
	footerHeight: null,
	storedRoute: '',
}

const enum REDUCER_ACTION_TYPE {
	ToggleNav,
	ToggleHeight,
	SetFooterHeight,
	SetRoute,
}

type ReducerAction = {
	type: REDUCER_ACTION_TYPE
	navOpen?: false
	footerHeight?: number
	storedRoute?: string
}

const reducer = (
	state: typeof initState,
	action: ReducerAction
): typeof initState => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.ToggleNav:
			return { ...state, NavOpen: !state.NavOpen }
		case REDUCER_ACTION_TYPE.ToggleHeight:
			return {
				...state,
				headerHeight: state.headerHeight === 8 ? 4 : 8,
			}
		case REDUCER_ACTION_TYPE.SetFooterHeight:
			if (action.footerHeight)
				return { ...state, footerHeight: action.footerHeight }
			return { ...state }
		case REDUCER_ACTION_TYPE.SetRoute:
			if (action.storedRoute) {
				return { ...state, storedRoute: action.storedRoute }
			}
			return { ...state }
		default: {
			return { ...state }
		}
	}
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
	[`.${drawerClasses.paperAnchorRight}`]: {
		backgroundColor: theme.palette.accentDark.main,
	},
}))

export default function Header(props: { children: JSX.Element }) {
	const [state, dispatch] = useReducer(reducer, initState)

	const [paddingWidth, setPaddingWidth] = useState(55)
	const ref = useRef<HTMLElement>(null)

	const location = useLocation()
	const navigate = useNavigate()

	const handleToggleNav = () => {
		dispatch({ type: REDUCER_ACTION_TYPE.ToggleNav })
	}
	const pages: { path: string; name: string }[] = [
		{
			path: '/events',
			name: 'Events',
		},
		{
			path: '/groups',
			name: 'Groups',
		},
		{
			path: '/blog',
			name: 'Blog',
		},
		{
			path: '/shop',
			name: 'Shop',
		},
		{
			path: '/about-us',
			name: 'About',
		},
		{
			path: '/contact',
			name: 'Contact/FAQ',
		},
	]

	const theme = useTheme()

	const checkPaddingWidth = () => {
		if (window.innerWidth > 1440) {
			setPaddingWidth((window.innerWidth - 1000) / 8)
			console.log((window.innerWidth - 1000) / 8)
		} else {
			console.log('55px')
			return setPaddingWidth(55)
		}
	}

	useEffect(() => {
		if (location.pathname != state.storedRoute) {
			dispatch({
				type: REDUCER_ACTION_TYPE.SetRoute,
				storedRoute: location.pathname,
			})
			window.scrollTo(0, 0)
		}
	})

	useEffect(() => {
		checkPaddingWidth()
		window.addEventListener('resize', checkPaddingWidth)
		return () => window.removeEventListener('resize', checkPaddingWidth)
	}, [])

	return (
		<>
			<AppBar
				position='relative'
				ref={ref}
				sx={{
					height: `90px`,
					zIndex: 5,
				}}
			>
				<Box
					px={{ xl: paddingWidth, lg: 20 }} // 60 * 4 = 240px
					height={'100%'}
					justifyContent='space-between'
					alignItems='center'
					sx={{
						display: 'flex',
						[theme.breakpoints.down('lg')]: {
							display: 'none',
						},
					}}
				>
					<Box
						display='flex'
						alignItems='center'
						height='100%'
						width='fit-content'
						sx={{ gap: 28 / 4 }}
					>
						<Link
							to='/'
							style={{
								marginLeft: 'auto',
								marginRight: 'auto',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Box
								component='img'
								src={PJKTFull}
								height='100%'
								width='auto'
								mr={1}
							/>
						</Link>
						{pages.map((page, i) => (
							<Typography
								onClick={() => {
									navigate(page.path)
								}}
								variant='body1'
								key={i}
								sx={{
									color: 'white',
									width: 'fit-content',
									p: 0,
									cursor: 'pointer',
								}}
							>
								{page.name}
							</Typography>
						))}
					</Box>
					<Button
						variant='contained'
						sx={{
							height: 'fit-content',
							width: 'fit-content',
							fontSize: `${theme.typography.caption.fontSize} !important`,
							fontFamily: theme.typography.body1.fontFamily,
						}}
					>
						<Box
							component='span'
							sx={{
								display: 'none',
								[theme.breakpoints.up('xl')]: {
									display: 'block',
								},
								mr: 1,
							}}
						>
							Sign Up /
						</Box>
						Login
					</Button>
				</Box>
				<Container
					sx={{
						display: 'none',
						justifyContent: 'space-between',
						[theme.breakpoints.down('lg')]: {
							display: 'flex',
						},
					}}
				>
					<Link to='/'>
						<Box
							component='img'
							src={PJKTFull}
							maxHeight='5em'
						/>
					</Link>
					<IconButton
						size='large'
						onClick={() => {
							console.log('click')
							handleToggleNav()
						}}
						color='inherit'
					>
						<MenuIcon />
					</IconButton>
					<StyledDrawer
						anchor='right'
						open={state.NavOpen}
						onClose={() =>
							dispatch({
								type: REDUCER_ACTION_TYPE.ToggleNav,
								navOpen: false,
							})
						}
						sx={{
							display: 'flex',
							[theme.breakpoints.up('lg')]: {
								display: 'none',
							},
						}}
					>
						<Box
							display='flex'
							justifyContent='flex-end'
							sx={{ px: 2, py: 4 }}
						>
							<IconButton
								size='large'
								onClick={handleToggleNav}
								color='inherit'
							>
								<Close />
							</IconButton>
						</Box>
						<Box
							width='100vw'
							maxWidth='400px'
							display='flex'
							flexDirection='column'
						>
							{pages.map((page, i) => (
								<Fragment key={i}>
									<Link
										to={page.path}
										onClick={handleToggleNav}
									>
										<Button color='inherit'>
											<Typography variant='h6'>
												{page.name}
											</Typography>
										</Button>
									</Link>
									<Divider sx={{ mb: 3 }} />
								</Fragment>
							))}
						</Box>

						<Link
							to='/'
							onClick={handleToggleNav}
						>
							<Button variant='text'>Login / Sign Up</Button>
						</Link>
						<Divider />
					</StyledDrawer>
				</Container>
			</AppBar>
			<Box
				sx={{
					minHeight: `calc(100vh - ${state.footerHeight}px)`,
					background: theme.palette.background.default,
					fontFamily: 'Poppins',
				}}
			>
				<Box
					minHeight={`calc(100vh - calc(${state.headerHeight}em))`}
					display='flex'
					flexDirection='column'
					sx={{
						backgroundImage: `url(${background})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center top',
					}}
				>
					{props.children}
				</Box>
				<Footer />
			</Box>
		</>
	)
}
