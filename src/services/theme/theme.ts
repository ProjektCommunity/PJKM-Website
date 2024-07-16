import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import '@fontsource/teko'
import '@fontsource/atkinson-hyperlegible'

const Heading = 'Teko'
const Body = 'Atkinson Hyperlegible'

declare module '@mui/material/styles' {
	interface Palette {
		tertiary: Palette['primary']
		accentLight: Palette['primary']
		accentDark: Palette['primary']
		tags: {
			Fest: Palette['primary']
			HorrorCon: Palette['primary']
			Lenz: Palette['primary']
			GraffitiGrab: Palette['primary']
			Ink: Palette['primary']
		}
	}

	interface PaletteOptions {
		tertiary?: PaletteOptions['primary']
		accentLight?: PaletteOptions['primary']
		accentDark?: PaletteOptions['primary']
		tags?: {
			Fest?: PaletteOptions['primary']
			HorrorCon?: PaletteOptions['primary']
			Lenz?: PaletteOptions['primary']
			GraffitiGrab?: PaletteOptions['primary']
			Ink?: PaletteOptions['primary']
		}
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		active: true
		nav: true
	}
}

let theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#FFE400',
			contrastText: '#000',
		},
		secondary: {
			main: '#00C6FF',
			contrastText: '#000',
		},
		tertiary: {
			main: '#A004FF',
			contrastText: '#FFF',
		},
		accentLight: {
			main: '#fff',
			contrastText: '#000',
		},
		accentDark: {
			main: '#000',
			contrastText: '#FFF',
		},
		tags: {
			Fest: {
				main: '#FC00AD',
				contrastText: '#000',
			},
			HorrorCon: {
				main: '#F70000',
				contrastText: '#000',
			},
			Lenz: {
				main: '#00B0FE',
				contrastText: '#000',
			},
			GraffitiGrab: {
				main: '#FFE400',
				contrastText: '#000',
			},
			Ink: {
				main: '#FFF',
				contrastText: '#000',
			},
		},
		success: {
			light: '#B9F6CA',
			'200': '#69F0AE',
			main: '#69F0AE',
			dark: '#00C853',
		},
		error: {
			light: '#EF9A9A',
			main: '#F44336',
			dark: '#C62828',
		},
		warning: {
			light: '#B9F6CA',
			main: '#FFE57F',
			dark: '#FFC107',
		},
		grey: {
			'50': '#FAFAFA',
			'100': '#F5F5F5',
			'200': '#EEEEEE',
			'300': '#E0E0E0',
			'500': '#9E9E9E',
			'600': '#757575',
			'700': '#616161',
			'900': '#212121',
		},
		background: {
			default:
				'linear-gradient(90deg, rgba(0,198,255,1) 0%, rgba(160,4,255,1) 100%)',
		},
		text: {
			primary: '#FFF',
			secondary: '#000',
		},
	},
	spacing: 4,
	typography: {
		h1: {
			fontFamily: Heading,
			color: '#fff',
			fontSize: '61.04px',
		},
		h2: {
			fontFamily: Heading,
			color: '#fff',
			fontSize: '48.83px',
		},
		h3: {
			fontFamily: Heading,
			color: '#fff',
			fontSize: '39.06px',
		},
		h4: {
			fontFamily: Heading,
			color: '#fff',
			fontSize: '31.25px',
		},
		h5: {
			fontFamily: Heading,
			color: '#fff',
			fontSize: '25px',
		},
		h6: {
			fontFamily: Heading,
			color: '#fff',
			fontSize: '20px',
		},
		body1: {
			fontFamily: Body,
			color: '#fff',
			fontSize: '16px',
		},
		body2: {
			fontFamily: Body,
			color: '#fff',
			fontSize: '12.8px',
		},
		caption: {
			fontFamily: Body,
			color: '#fff',
		},
		subtitle1: {
			fontFamily: Body,
			color: '#fff',
		},
		subtitle2: {
			fontFamily: Body,
			color: '#fff',
		},
		button: {
			fontFamily: Heading,
			fontSize: '20px',
			fontWeight: 'bold',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 375,
			md: 768,
			lg: 1024,
			xl: 1440,
		},
	},
	components: {
		MuiButtonBase: {
			styleOverrides: {
				root: {
					borderRadius: '50px !important',
					px: '24px !important',
					py: '10px !important',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: ({ ownerState }) => ({
					fontSize: '16px',
					fontFamily: Body,
					padding: '10px 24px',
					...((ownerState.disabled && {
						backgroundColor: '#555555',
						color: '#BFBFBF',
					}) ||
						(ownerState.variant === 'contained' && {
							backgroundColor: '#FFE400',
							color: '#000',
							'&:hover': {
								backgroundColor: '#FFF38C',
							},
						}) ||
						(ownerState.variant === 'outlined' && {
							backgroundColor: 'transparent',
							color: '#FFE400',
							border: '1px solid #FFE400',
							'&:hover': {
								backgroundColor: '#FFF38C',
								color: '#000',
							},
						}) ||
						(ownerState.variant === 'active' && {
							backgroundColor: '#000',
							color: '#FFF',
						}) ||
						(ownerState.variant === 'nav' && {
							backgroundColor: 'transparent',
							color: '#fff',
							'&:hover': {
								color: '#FFE400',
							},
						}) ||
						(ownerState.variant === 'text' && {
							backgroundColor: 'transparent',
							color: '#FFE400',
							'&:hover': {
								color: '#FFF38C',
								backgroundColor: 'transparent',
							},
						})),
				}),
			},
			variants: [
				{
					props: { variant: 'active' },
					style: {
						backgroundColor: '#fff',
						color: '#000',
					},
				},
			],
		},
	},
})

theme = responsiveFontSizes(theme)
export default theme
