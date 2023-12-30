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
import { Menu as MenuIcon, Twitter, YouTube } from '@mui/icons-material'
import PJKTFull from '@/assets/PJKT-01.png'
import { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { toggleTheme } from '@/store/theme/themeSlice'
import background from '@/assets/photos/Home/Background.png'
import { Footer } from './Footer'
const initState: {
	NavOpen: boolean
	headerHeight: number
	footerHeight: number | null
	storedRoute: string
} = {
	NavOpen: false,
	headerHeight: 4,
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
			if (action.navOpen) return { ...state, NavOpen: action.navOpen }
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
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
}))

export default function Header(props: { children: JSX.Element }) {
	const [state, dispatch] = useReducer(reducer, initState)
	const ref = useRef<HTMLElement>(null)

	const location = useLocation()

	const handleToggleNav = () => {
		dispatch({ type: REDUCER_ACTION_TYPE.ToggleNav })
	}
	const pages: { path: string; name: string }[] = [
		{
			path: '/about-us',
			name: 'About',
		},
		{
			path: '/events',
			name: 'Events',
		},
		{
			path: '/contact-us',
			name: 'Contact',
		},
	]

	const theme = useTheme()

	useEffect(() => {
		if (location.pathname != state.storedRoute) {
			dispatch({
				type: REDUCER_ACTION_TYPE.SetRoute,
				storedRoute: location.pathname,
			})
			window.scrollTo(0, 0)
		}
		// window.addEventListener('scroll', () => {
		// 	if (
		// 		location.pathname == '/' &&
		// 		((window.scrollY > 5 && state.headerHeight != 4) ||
		// 			(window.scrollY < 5 && state.headerHeight != 8))
		// 	)
		// 		dispatch({ type: REDUCER_ACTION_TYPE.ToggleHeight })
		// })

		setTimeout(() => {
			dispatch({
				type: REDUCER_ACTION_TYPE.SetFooterHeight,
				footerHeight: document.querySelector('.footer')?.clientHeight,
			})
		}, 500)
	})

	return (
		<>
			<AppBar
				position={location.pathname == '/' ? 'fixed' : 'relative'}
				color={location.pathname == '/' ? 'transparent' : 'primary'}
				enableColorOnDark
				ref={ref}
				sx={{
					height: `${state.headerHeight}em`,
					mb:
						location.pathname === '/'
							? `${0 - state.headerHeight}em`
							: 0,
					zIndex: 5,
					transition: 'height 1s ease',
				}}
			>
				<Box
					position={'absolute'}
					top={0}
					left={0}
					width={'100%'}
					height={'100%'}
					sx={{
						zIndex: -1,
						backdropFilter: 'blur(8px)',
						backgroundColor: 'rgba(0,0,0,0.35)',
					}}
				/>
				<Grid
					container
					mx={20}
					display={{ xs: 'none', lg: 'flex' }}
					height={'100%'}
				>
					<Grid
						xs={6}
						height='100%'
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
								mr={1}
							/>
							<Typography
								fontFamily='Norwester'
								variant='h5'
								color={theme.palette.primary.light}
								lineHeight={0.9}
								whiteSpace={'pre-wrap'}
							>
								Projekt:{`\n`}Community
							</Typography>
						</Link>
					</Grid>
					<Grid
						xs={6}
						display='flex'
						flexDirection='row'
						justifyContent='center'
					>
						{pages.map((page, i) => (
							<Button
								key={i}
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
								}}
							>
								<Link to={page.path}>
									<Typography variant='h6'>
										{page.name}
									</Typography>
								</Link>
							</Button>
						))}
					</Grid>
				</Grid>
				<Container
					maxWidth='lg'
					sx={{
						display: { xs: 'flex', lg: 'none' },
						justifyContent: 'space-between',
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
						onClick={handleToggleNav}
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
							display: { xs: 'flex', lg: 'none' },
						}}
					>
						<Box
							my={15}
							minWidth='30em'
							display='flex'
							flexDirection='column'
						>
							{pages.map((page, i) => (
								<Fragment key={i}>
									<Link to={page.path}>
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
					</StyledDrawer>
				</Container>
			</AppBar>
			<Paper
				square
				sx={{
					minHeight: `calc(100vh - ${state.footerHeight}px)`,
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center top',
				}}
			>
				<Box
					minHeight={`calc(100vh - calc(${state.headerHeight}em))`}
					display='flex'
					flexDirection='column'
				>
					{props.children}
				</Box>
				<Footer />
			</Paper>
		</>
	)
}
